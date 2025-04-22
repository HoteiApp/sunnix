package controllers

import (
	"encoding/base64"
	"encoding/json"
	"strconv"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func createUser(worker models.WorkerRecord) error {
	// Create a transaction in the database
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Create the worker record
		if err := db.Create(&worker).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}

		// // Associate the worker record with the user
		// user.Record = worker.ID

		// // Insert the user into the "users" table
		// if err := db.Create(&user).Error; err != nil {
		// 	db.Rollback() // Rollback the transaction in case of error
		// 	return err
		// }

		// Create an education record for the worker
		education := new(models.Educations)
		education.WorkerRecordID = worker.ID
		if err := db.Create(&education).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}

		// Create an employment history record for the worker
		employmentHistory := new(models.EmploymentHistory)
		employmentHistory.WorkerRecordID = worker.ID
		if err := db.Create(&employmentHistory).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}

		// Create a personal references record for the worker
		personalReferences := new(models.PersonalReferences)
		personalReferences.WorkerRecordID = worker.ID
		if err := db.Create(&personalReferences).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}

		// Create an emergency medical record for the worker
		emergencyMedical := new(models.EmergencyMedical)
		emergencyMedical.WorkerRecordID = worker.ID
		if err := db.Create(&emergencyMedical).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}
		// Create an necesary documents record for the worker
		necessaryDocuments := new(models.NecessaryDocuments)
		necessaryDocuments.WorkerRecordID = worker.ID
		if err := db.Create(&necessaryDocuments).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}
		// Create an direct deposit record for the worker
		directDeposit := new(models.DirectDeposit)
		directDeposit.WorkerRecordID = worker.ID
		if err := db.Create(&directDeposit).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}
		// Create an Employment Verification form
		employmentVerification := new(models.EmploymentVerification)
		employmentVerification.WorkerRecordID = worker.ID
		if err := db.Create(&employmentVerification).Error; err != nil {
			db.Rollback() // Rollback the transaction in case of error
			return err
		}
		// Commit the transaction
		if err := db.Commit().Error; err != nil {
			return err
		}
		return nil
	})

	return nil
}

func Register(c *fiber.Ctx) error {
	// claims, err := GetClaims(c)
	// if err != nil {
	// 	c.Status(fiber.StatusForbidden)
	// 	return c.JSON(fiber.Map{
	// 		"message": "error",
	// 	})
	// }
	// activeUser := GetUserInfo(claims["Uid"].(string))
	// users := new(models.Users)

	// Parse the request body into the 'users' struct
	// if err := c.BodyParser(users); err != nil {
	// 	return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	// }
	var requestData models.FormRegister
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	// var data map[string]string
	// if err := c.BodyParser(&data); err != nil {
	// 	return err
	// }

	username := strings.ToLower(strings.ToLower(requestData.Requestregister.Username))
	password := strings.ToLower(requestData.Requestregister.Password)

	// Create a new record in the database
	if strings.Contains(username, "@") {
		username = strings.Split(username, "@")[0]
	}

	result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+username+"))")
	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"OK":      false,
			"message": core.GetTextMessage("login_err_003"),
		})
	}

	record := new(models.WorkerRecord)
	record.Uid = username
	// Now that the user is created, create the worker record and other related records
	if err := createUser(*record); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	var doc models.WorkerRecord
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		db.Where("uid = ?", username).Find(&doc)

		return false
	})

	id := strconv.Itoa(int(doc.ID))
	// Agregar cuenta de usuario
	resultAdd := core.ExtractFunctionsPlugins("ldap", "AddAccount",
		"uid-->"+username,
		"ou-->users",
		"id-->"+id,
		"sn-->"+username,
		"cn-->"+username,
		"givenName-->"+username,
		"mail-->"+username+"@sunissup.com",
		"userPassword-->"+system.GetMD5Hash(password),
		"status-->hiring",
		"global-->True",
		"roll-->tmp",
		"approved-->false",
		"active-->True",
		"mailService-->False",
		"chatService-->True",
		"faxService-->False",
		"changePassword-->True",
		"securityCode-->False",
		"hrCanSign-->False",
		"qaCanSign-->False",
		"tcmsCanSign-->False",
		"temporarySupervisor-->False",
		"credentials-->CBHCM",
		"signature-->null",
		"supervisor-->"+username,
		// "fixedPay-->False",
		"paymentByUnits-->7.28",
	)

	if !resultAdd.(bool) {
		return c.Status(fiber.StatusConflict).SendString("Username add error")
	}

	system.Log <- models.Logs{
		App:         "sunissup",
		Action:      "ADD_USER",
		LoggedIn:    username,
		Username:    username,
		Client:      0,
		Description: core.GetTextMessage("user_add", username),
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": core.GetTextMessage("user_add", username),
	})
}

func CheckEmail(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	email := strings.ToLower(data["email"])

	// Create a new record in the database
	if strings.Trim(email, " ") == "" || !strings.Contains(email, "@") {
		c.Status(fiber.StatusConflict)
		return c.JSON(fiber.Map{
			"OK":      false,
			"CREATE":  false,
			"message": core.GetTextMessage("login_err_001"),
		})
	}

	// Check email
	result := core.CheckEmail(email)

	if result {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"OK":      true,
			"CREATE":  false,
			"message": core.GetTextMessage("user_add_exist", email),
		})
	}
	uid := strings.Split(email, "@")[0]
	resultGetUid := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")
	bytes, _ := json.Marshal(&resultGetUid)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		userLdap := resultSearch.Entries[0].GetAttributeValue("nick")
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"OK":      true,
			"CREATE":  false,
			"message": core.GetTextMessage("user_add_exist", userLdap),
		})
	}
	if result {

	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"OK":      false,
		"CREATE":  true,
		"message": core.GetTextMessage("login_err_003", email),
	})
}

func ChangePassword(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password := data["current"]
	passwordNew := data["password"]

	if password == "" || passwordNew == "" {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"ok":      "false",
			"message": core.GetTextMessage("changepassword_err_001"),
		})
	}
	if password == passwordNew {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"ok":      "false",
			"message": core.GetTextMessage("changepassword_err_003"),
		})
	}

	resultLogin := core.ExtractFunctionsPlugins("ldap", "Login", claims["UID"].(string), password)

	if !resultLogin.(bool) {

		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"ok":      "false",
			"message": core.GetTextMessage("changepassword_err_004"),
		})
	}

	result := core.ExtractFunctionsPlugins("ldap", "ChangePasswordAccount", claims["UID"], passwordNew)

	if result.(bool) {
		core.ExtractFunctionsPlugins("ldap", "ModifyAccount", claims["UID"],
			"changePassword-->False",
		)
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_PERSONAL_PASSWORD",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: core.GetTextMessage("changepassword_ok_001"),
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"ok":      "true",
			"message": core.GetTextMessage("changepassword_ok_001"),
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ChangeUserPassword(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password := data["password"]

	if password == "" {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"ok":      "false",
			"message": core.GetTextMessage("changepassword_err_001"),
		})
	}

	result := core.ExtractFunctionsPlugins("ldap", "ChangePasswordAccount", data["uid"], password)

	// result, _ := database.WithDB(func(db *gorm.DB) interface{} {
	// 	var user models.Users
	// 	db.Where("id = ?", claims["ID"].(float64)).Find(&user)
	// 	user.Password = password
	// 	user.ChangePassword = false
	// 	return db.Save(&user)
	// })

	if result.(bool) {
		core.ExtractFunctionsPlugins("ldap", "ModifyAccount", data["uid"],
			"changePassword-->False",
		)
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_PERSONAL_PASSWORD",
			LoggedIn:    data["uid"],
			Username:    data["uid"],
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"ok":      "true",
			"message": core.GetTextMessage("changepassword_ok_001"),
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ApproveUser(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	uid := data["uid"]
	roll := data["roll"]

	tcms := data["tcms"]

	if uid == "" {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"ok": "false",
			// "message": core.GetTextMessage("changepassword_err_001"),
			"message": "Error approving user",
		})
	}

	switch roll {
	case "HR Assistan":
		roll = "HR"
	case "Accounting Assistant":
		roll = "FINANCE"
	case "Billing Agent":
		roll = "BILLER"
	case "TCM QA":
		roll = "QA"
	case "TCM Supervisor":
		roll = "TCMS"
	}

	result := core.ExtractFunctionsPlugins("ldap", "ModifyAccount", uid,
		"approved-->True",
		"status-->hired",
		"roll-->"+roll,
		"supervisor-->"+tcms,
	)

	// result, _ := database.WithDB(func(db *gorm.DB) interface{} {
	// 	var user models.Users
	// 	db.Where("id = ?", claims["ID"].(float64)).Find(&user)
	// 	user.Password = password
	// 	user.ChangePassword = false
	// 	return db.Save(&user)
	// })

	if result.(bool) {

		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_USER",
			LoggedIn:    data["uid"],
			Username:    data["uid"],
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"ok": "true",
			// "message": core.GetTextMessage("changepassword_ok_001"),
			"message": "User successfully approved",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ChangeSignature(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var data map[string]interface{}
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	plainImage, _ := base64.StdEncoding.DecodeString(strings.Replace(data["sign"].(string), "data:image/png;base64,", "", -1))
	encryptedSign, _ := core.EncryptImage(plainImage)

	result := core.ExtractFunctionsPlugins("ldap", "ModifyAccount", claims["UID"],
		"id-->"+strconv.Itoa(int(claims["ID"].(float64))),
		"signature-->"+encryptedSign,
		"qaCanSign-->"+strconv.FormatBool(data["singQa"].(bool)),
		"tcmsCanSign-->"+strconv.FormatBool(data["singSupervisor"].(bool)),
	)

	if result.(bool) {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_PERSONAL_SIGNATURE",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Your signature was saved, correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}
