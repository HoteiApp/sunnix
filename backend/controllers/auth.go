package controllers

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

func authenticateUser(c *fiber.Ctx, active models.ActiveUser, user string) (models.ActiveUser, error) {

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["ID"] = active.Record.ID
	claims["UID"] = user
	claims["RECORD"] = active.Record.ID
	claims["FullName"] = active.Record.FullName
	claims["Roll"] = active.User.Roll
	claims["Gobal"] = active.User.Global
	claims["Credentials"] = active.User.Credentials
	claims["Expires"] = time.Now().Add(time.Hour * 4).Unix() // El token expira en 4 horas
	tokenString, err := token.SignedString([]byte(system.SecretKey))

	if err != nil {
		return models.ActiveUser{}, errors.New("InvalidSecretKey")
	}

	cookie := fiber.Cookie{
		Name:     system.KeySunissUp,
		Value:    tokenString,
		Expires:  time.Now().Add(time.Hour * 4),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	system.Log <- models.Logs{
		App:         "sunissup",
		Action:      "LOGIN_SUCCESS",
		LoggedIn:    user,
		Username:    user,
		Client:      0,
		Description: core.GetTextMessage("login_ok_001"),
	}

	c.Context().SetUserValue("claims", claims)
	c.Context().SetUserValue("activeUser", active)

	return active, nil
}

func GetClaims(c *fiber.Ctx) (jwt.MapClaims, error) {
	cookie := c.Cookies(system.KeySunissUp)
	// Verificar el token JWT
	token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		// Verificar el método de firma
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Invalid signature method")
		}
		// Devolver la clave secreta
		return []byte(system.SecretKey), nil
	})
	if err != nil {
		return nil, err // Devuelve el error
	}

	// Obtener los datos del usuario del token JWT
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("Could not get user data from JWT token")
	}
	return claims, nil
}

func GetUserInfo(uid string) models.ActiveUser {
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// Realizar consulta y operaciones en la base de datos utilizando `db`
		var active models.ActiveUser
		var user models.Users
		result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")
		bytes, _ := json.Marshal(&result)
		var resultSearch ldap.SearchResult
		_ = json.Unmarshal(bytes, &resultSearch)

		if len(resultSearch.Entries) > 0 {
			userLdap := resultSearch.Entries[0]
			// FIXME: Aqui va los campos de la tabla de usuario exportados del LDAP
			id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)

			user.ID = uint(id)
			user.Uid = userLdap.GetAttributeValue("uid")
			user.Email = userLdap.GetAttributeValue("mail")
			user.Nick = userLdap.GetAttributeValue("givenName")
			user.SecurityCode = system.StringToBool(userLdap.GetAttributeValue("securityCode"))

			user.Status = userLdap.GetAttributeValue("status")

			user.Active = system.StringToBool(userLdap.GetAttributeValue("active"))
			user.Approved = system.StringToBool(userLdap.GetAttributeValue("approved"))
			user.Global = system.StringToBool(userLdap.GetAttributeValue("global"))
			user.ChangePassword = system.StringToBool(userLdap.GetAttributeValue("changePassword"))

			user.Signature = userLdap.GetAttributeValue("signature")

			user.Roll = userLdap.GetAttributeValue("roll")
			user.Credentials = userLdap.GetAttributeValue("credentials")
			user.Supervisor = userLdap.GetAttributeValue("supervisor")
			user.Business = userLdap.GetAttributeValue("business")
			// TODO: Se esta utilizando el campo global para el campo FixedPay hasta que se actualicen los ldap
			user.FixedPay = system.StringToBool(userLdap.GetAttributeValue("global"))
			// user.FixedPay = system.StringToBool(userLdap.GetAttributeValue("fixedPay"))

			paymentByUnits, _ := strconv.ParseFloat(userLdap.GetAttributeValue("paymentByUnits"), 64)

			rent, _ := strconv.ParseFloat(userLdap.GetAttributeValue("rent"), 64)

			user.PaymentByUnits = paymentByUnits
			user.Rent = rent

			var record models.WorkerRecord
			db.Where("uid = ?", uid).First(&record)
			user.ID = record.ID
			user.Record = record.ID
			// Actualizar el id del usuario por el el id del WorkerRecord
			if record.ID != uint(id) {
				core.ExtractFunctionsPlugins("ldap", "ModifyAccount", uid,
					"id-->"+strconv.Itoa(int(record.ID)),
				)
			}

			if record.FullName != "" && record.FullName != userLdap.GetAttributeValue("cn") {
				fullname := strings.Split(record.FullName, " ")
				givenName := ""
				sn := ""

				if len(fullname) > 1 {
					givenName = fullname[0]
					sn = strings.Join(fullname[1:], " ")
				} else {
					givenName = fullname[0]
					sn = fullname[1]
				}
				core.ExtractFunctionsPlugins("ldap", "ModifyAccount", uid,
					"givenName-->"+givenName,
					"sn-->"+sn,
					"cn-->"+givenName+" "+sn,
				)
			}

			var education models.Educations
			db.Where("worker_record_id = ?", record.ID).First(&education)
			record.Education = education

			var employmentHistoty models.EmploymentHistory
			db.Where("worker_record_id = ?", record.ID).First(&employmentHistoty)
			record.EmploymentHistory = employmentHistoty

			var personalReferences models.PersonalReferences
			db.Where("worker_record_id = ?", record.ID).First(&personalReferences)
			record.PersonalReferences = personalReferences

			var emergencyMedical models.EmergencyMedical
			db.Where("worker_record_id = ?", record.ID).First(&emergencyMedical)
			record.EmergencyMedical = emergencyMedical

			var necessaryDocuments models.NecessaryDocuments
			db.Where("worker_record_id = ?", record.ID).First(&necessaryDocuments)
			record.NecessaryDocuments = necessaryDocuments

			var directDeposit models.DirectDeposit
			db.Where("worker_record_id = ?", record.ID).First(&directDeposit)
			record.DirectDeposit = directDeposit

			var employmentVerification models.EmploymentVerification
			db.Where("worker_record_id = ?", record.ID).First(&employmentVerification)
			record.EmploymentVerification = employmentVerification

			decryptedImage, _ := core.DecryptImage(user.Signature)
			active.User = user
			active.Record = record
			if len(decryptedImage) > 0 {
				active.Signature = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedImage)
			} else {
				active.Signature = ""
			}

			// Active Week
			var week models.Week
			db.Where("active = ?", true).First(&week)
			active.WeekActive = week

			// Active Fortnight
			var fortnight models.Fortnight
			db.Where("active = ?", true).First(&fortnight)
			active.FortnightActive = fortnight

			// Avatar
			// objectsUrl := core.ExtractFunctionsPlugins("s3", "PresignedURL", "records/"+uid+"/", "60")
			objectsUrl := core.ExtractFunctionsPlugins("s3", "ListeFilesInFolder", "records/"+uid+"/")

			// var extractDocs []models.ExtractDocs
			// num := 0
			url := ""
			for _, doc := range objectsUrl.([]map[string]string) {
				if strings.Contains(doc["Key"], "avatar") {
					url = doc["URL"]
					active.Avatar = url
				}
			}
			// Table preference
			var pref models.TablePreference
			db.Where("user_id = ?", uid).Find(&pref)
			active.TablePreference = pref

		}

		return active
	})

	return result.(models.ActiveUser)
}

func GetUsersInfo(uids []string) []models.ActiveUser {
	var activeUsers []models.ActiveUser

	// Usamos la función de base de datos con DB
	database.WithDB(func(db *gorm.DB) interface{} {
		for _, uid := range uids {
			var active models.ActiveUser
			var user models.Users

			result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")
			bytes, _ := json.Marshal(&result)
			var resultSearch ldap.SearchResult
			_ = json.Unmarshal(bytes, &resultSearch)

			if len(resultSearch.Entries) > 0 {
				userLdap := resultSearch.Entries[0]
				// (Aquí va todo el procesamiento igual que en tu función original)
				// Ejemplo para algunos campos:
				id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
				user.ID = uint(id)
				user.Uid = userLdap.GetAttributeValue("uid")
				// ... (más campos, igual que antes)

				var record models.WorkerRecord
				db.Where("uid = ?", uid).First(&record)
				user.ID = record.ID
				user.Record = record.ID

				// Actualización LDAP si es necesario (igual que antes)
				if record.ID != uint(id) {
					core.ExtractFunctionsPlugins("ldap", "ModifyAccount", uid,
						"id-->"+strconv.Itoa(int(record.ID)),
					)
				}

				// Actualizar otros campos y relaciones
				// ...

				decryptedImage, _ := core.DecryptImage(user.Signature)
				active.User = user
				active.Record = record
				if len(decryptedImage) > 0 {
					active.Signature = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedImage)
				} else {
					active.Signature = ""
				}

				var week models.Week
				db.Where("active = ?", true).First(&week)
				active.WeekActive = week

				var fortnight models.Fortnight
				db.Where("active = ?", true).First(&fortnight)
				active.FortnightActive = fortnight

				// Obtener avatar
				objectsUrl := core.ExtractFunctionsPlugins("s3", "ListeFilesInFolder", "records/"+uid+"/")
				url := ""
				for _, doc := range objectsUrl.([]map[string]string) {
					if strings.Contains(doc["Key"], "avatar") {
						url = doc["URL"]
						active.Avatar = url
					}
				}

				var pref models.TablePreference
				db.Where("user_id = ?", uid).Find(&pref)
				active.TablePreference = pref

				// Añadir usuario activo al slice
				activeUsers = append(activeUsers, active)
			}
		}
		return nil
	})

	return activeUsers
}

func AuthLogin(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	username := strings.ToLower(data["username"])
	password := data["password"]

	if strings.Trim(username, " ") == "" || strings.Trim(password, " ") == "" {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "LOGIN_ERROR",
			LoggedIn:    username,
			Username:    username,
			Client:      0,
			Description: core.GetTextMessage("login_err_001"),
		}
		c.Status(fiber.StatusConflict)
		return c.JSON(fiber.Map{
			"OK":      false,
			"message": core.GetTextMessage("login_err_001"),
		})
	}

	if username == "" || password == "" {
		var missingFields []string
		if username == "" {
			missingFields = append(missingFields, core.GetTextMessage("login_info_001"))
		}
		if password == "" {
			missingFields = append(missingFields, core.GetTextMessage("login_info_002"))
		}
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"OK":      false,
			"message": fmt.Sprintf("%s: %v.", core.GetTextMessage("global_info_001"), strings.Join(missingFields, ", ")),
		})
	}
	// ---------------
	resultLogin := core.ExtractFunctionsPlugins("ldap", "Login", username, password)

	if !resultLogin.(bool) {
		c.Status(fiber.StatusUnauthorized)

		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "LOGIN_ERROR",
			LoggedIn:    username,
			Username:    username,
			Client:      0,
			Description: core.GetTextMessage("login_err_002"),
		}
		return c.JSON(fiber.Map{
			"OK":      false,
			"message": core.GetTextMessage("login_err_002"),
		})
	}

	resultGetUser := GetUserInfo(username)

	securityCode := false

	if resultGetUser.User.Email != "" {
		securityCode = resultGetUser.User.SecurityCode
	} else {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"OK":      false,
			"message": core.GetTextMessage("login_err_003"),
		})
	}

	if securityCode {
		twoFAURl, _ := c.GetRouteURL("TwoFaAuth", fiber.Map{})
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"url": twoFAURl})
	}
	c.Status(fiber.StatusOK)

	activeUser, err := authenticateUser(c, resultGetUser, username)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"OK":      false,
			"message": core.GetTextMessage("login_err_005"),
		})
	}
	// Enviar el mensaje a Telegram
	go func() {
		message := "User: " + username + ",  login system: " + system.Version
		if err := Webhook(message); err != nil {
			fmt.Println(err)
		}
	}()

	return c.JSON(fiber.Map{
		"OK":         true,
		"message":    core.GreetingOfTheDay() + " " + strings.Split(activeUser.Record.FullName, " ")[0] + ", " + core.GetTextMessage("login_ok_001"),
		"activeUser": activeUser,
	})
}

func AuthLogout(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)

	system.Log <- models.Logs{
		App:         "sunissup",
		Action:      "LOGOUT",
		LoggedIn:    claims["UID"].(string),
		Username:    claims["UID"].(string),
		Client:      0,
		Description: core.GetTextMessage("logout_ok_001"),
	}
	cookie := fiber.Cookie{
		Name:     system.KeySunissUp,
		Value:    "",
		Expires:  time.Now().Add(-(time.Hour * 2)),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func AuthActiveUser(c *fiber.Ctx) error {
	claims, err := GetClaims(c)
	if err != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "error",
		})
	}
	activeUser := GetUserInfo(claims["UID"].(string))
	return c.JSON(fiber.Map{
		"activeUser": activeUser,
	})
}
