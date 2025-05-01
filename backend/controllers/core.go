package controllers

import (
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

func CoreStatistics(c *fiber.Ctx) error {
	var users []models.Users
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// Query the database for all users
		result := db.Model(&models.Users{}).Find(&users)
		return result
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		// Calculate the statistics
		totalUsers := len(users)
		usersHiring := 0
		usersApplication := 0
		usersContracted := 0
		usersInactive := 0

		for _, user := range users {
			if user.Status == "hiring" {
				usersHiring++
			} else if user.Status == "application" {
				usersApplication++
			} else if user.Status == "contracted" {
				usersContracted++
			} else if user.Status == "inactive" {
				usersInactive++
			}
		}

		// Create the statistics struct
		statistics := models.Statistics{
			TotalUsers:       totalUsers,
			UsersHiring:      usersHiring,
			UsersApplication: usersApplication,
			UsersContracted:  usersContracted,
			UsersInactive:    usersInactive,
		}

		// Return the statistics
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message":    "Statistics",
			"statistics": statistics,
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No users found",
	})
}

func CoreListUser(c *fiber.Ctx) error {
	var users []models.Users
	result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid=*))")
	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)
	if len(resultSearch.Entries) > 0 {
		for _, userLdap := range resultSearch.Entries {
			id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
			objectsUrl := core.ExtractFunctionsPlugins("s3", "ListeFilesInFolder", "records/"+userLdap.GetAttributeValue("uid")+"/")
			avatar := ""
			for _, doc := range objectsUrl.([]map[string]string) {
				if strings.Contains(doc["Key"], "avatar") {
					avatar = doc["URL"]
					break
				}
			}

			users = append(users, models.Users{
				ID:           uint(id),
				Uid:          userLdap.GetAttributeValue("uid"),
				Email:        userLdap.GetAttributeValue("mail"),
				Nick:         userLdap.GetAttributeValue("cn"),
				SecurityCode: system.StringToBool(userLdap.GetAttributeValue("securityCode")),
				Active:       system.StringToBool(userLdap.GetAttributeValue("active")),
				Approved:     system.StringToBool(userLdap.GetAttributeValue("approved")),
				Global:       system.StringToBool(userLdap.GetAttributeValue("global")),
				Roll:         userLdap.GetAttributeValue("roll"),
				Credentials:  userLdap.GetAttributeValue("credentials"),
				Supervisor:   userLdap.GetAttributeValue("supervisor"),
				Business:     userLdap.GetAttributeValue("business"),
				Avatar:       avatar,
			})
		}
	}
	if len(users) > 0 {
		// Return the list of users
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "List User",
			"users":   users,
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "No users found",
	})
}

func CoreListUserApplication(c *fiber.Ctx) error {
	var users []models.Users
	result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(approved=false)(status=application))")
	bytes, _ := json.Marshal(&result)

	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		for _, user := range resultSearch.Entries {
			id, _ := strconv.ParseUint(user.GetAttributeValue("id"), 10, 64)
			users = append(users, models.Users{
				ID:     uint(id),
				Uid:    user.GetAttributeValue("uid"),
				Email:  user.GetAttributeValue("mail"),
				Roll:   user.GetAttributeValue("roll"),
				Status: user.GetAttributeValue("status"),
			})
		}
	}
	// result, err := database.WithDB(func(db *gorm.DB) interface{} {
	// 	// Query the database for all users
	// 	result := db.Model(&models.Users{}).Where("approved = ? and status = ?", false, "application").Find(&users)
	// 	return result
	// })
	// if err != nil {
	// 	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
	// 		"message": "Error",
	// 	})
	// }
	// if result.(*gorm.DB).RowsAffected > 0 {
	// 	// Return the list of users
	// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
	// 		"message": "List User",
	// 		"users":   users,
	// 	})
	// }
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "List User",
		"users":   users,
	})
	// return c.Status(fiber.StatusOK).JSON(fiber.Map{
	// 	"message": "No users found",
	// })
}

func CoreListUserHiring(c *fiber.Ctx) error {
	var users []models.Users
	result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(approved=false)(status=hiring))")
	bytes, _ := json.Marshal(&result)

	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		for _, user := range resultSearch.Entries {
			id, _ := strconv.ParseUint(user.GetAttributeValue("id"), 10, 64)
			users = append(users, models.Users{
				ID:     uint(id),
				Uid:    user.GetAttributeValue("uid"),
				Email:  user.GetAttributeValue("mail"),
				Roll:   user.GetAttributeValue("roll"),
				Status: user.GetAttributeValue("status"),
			})
		}
	}
	// result, err := database.WithDB(func(db *gorm.DB) interface{} {
	// 	// Query the database for all users
	// 	result := db.Model(&models.Users{}).Where("approved = ? and status = ?", false, "hiring").Find(&users)
	// 	return result
	// })
	// if err != nil {
	// 	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
	// 		"message": "Error",
	// 	})
	// }

	// Return the list of users
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "List User",
		"users":   users,
	})

}

func CoreGetinfoUid(c *fiber.Ctx) error {
	uid := c.Params("uid")
	activeUser := GetUserInfo(uid)
	return c.JSON(fiber.Map{
		"userInfo": activeUser,
	})
}

// func CoreListRequestNewClients(c *fiber.Ctx) error {
// 	var requests []models.RequestNewClient
// 	result, err := database.WithDB(func(db *gorm.DB) interface{} {
// 		// Query the database for all users
// 		result := db.Model(&models.RequestNewClient{}).Find(&requests)
// 		return result
// 	})
// 	if err != nil {
// 		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
// 			"message": "Error",
// 		})
// 	}
// 	if result.(*gorm.DB).RowsAffected > 0 {
// 		// Return the list of users
// 		return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 			"message": "List Requests New Clients",
// 			"request": requests,
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message": "No users found",
// 	})
// }

// func CoreGetTCMS(c *fiber.Ctx) error {
// 	result, err := database.WithDB(func(db *gorm.DB) interface{} {
// 		var tcms []models.OutTCMS
// 		// Query the database for all users
// 		// result := db.Model(&models.Users{}).Where("roll = ? and status = ?", "SUPERVISOR", "active").Find(&users)

// 		var listTcms []models.Users
// 		db.Where("roll = ? and status = ?", "SUPERVISOR", "active").Find(&listTcms)
// 		for k, supervisor := range listTcms {
// 			userInfo := GetUserInfo(supervisor.Email)
// 			// --
// 			var tcm []models.Users
// 			db.Where("supervisor = ? and roll = ?", supervisor.ID, "TCM").Find(&tcm)

// 			var outTCM []models.OutTCM
// 			for i, uTCM := range tcm {
// 				tcmInfo := GetUserInfo(uTCM.Email)

// 				var clients []models.OutClients
// 				var caseManagement []models.ClientServiceCaseManagement
// 				// With this query obtain only one scm from each tcm client
// 				db.Select("DISTINCT client").Where("tcm = ?", uTCM.ID).Find(&caseManagement)

// 				for _, val := range caseManagement {
// 					var client models.Clients
// 					db.Where("ID = ?", val.Client).Find(&client)
// 					var cms []models.ClientServiceCaseManagement
// 					db.Where("client = ?", client.ID).Find(&cms)
// 					var scm []models.OutClientSCM
// 					for _, cm := range cms {
// 						var tcm models.ClienteSCMTcm
// 						db.Where("scm = ?", cm.ID).Find(&tcm)
// 						var demografic models.ClientSCMDemografic
// 						db.Where("scm = ?", cm.ID).Find(&demografic)
// 						var sures []models.ClientSCMSure
// 						db.Where("scm = ?", cm.ID).Find(&sures)
// 						var medicals []models.ClientSCMMedical
// 						db.Where("scm = ?", cm.ID).Find(&medicals)
// 						var mentals []models.ClientSCMMental
// 						db.Where("scm = ?", cm.ID).Find(&mentals)
// 						// Documents
// 						var certification models.ClientSCMCertification
// 						db.Where("scm = ?", cm.ID).Find(&certification)

// 						var assessment models.ClientSCMAssessment
// 						db.Where("scm = ?", cm.ID).Find(&assessment)

// 						var sp models.ClientSCMSp
// 						db.Where("scm = ?", cm.ID).Find(&sp)

// 						var goal1 models.SpGoal1
// 						db.Where("sp = ?", sp.ID).Find(&goal1)
// 						var goal2 models.SpGoal2
// 						db.Where("sp = ?", sp.ID).Find(&goal2)
// 						var goal3 models.SpGoal3
// 						db.Where("sp = ?", sp.ID).Find(&goal3)
// 						var goal4 models.SpGoal4
// 						db.Where("sp = ?", sp.ID).Find(&goal4)
// 						var goal5 models.SpGoal5
// 						db.Where("sp = ?", sp.ID).Find(&goal5)
// 						var goal6 models.SpGoal6
// 						db.Where("sp = ?", sp.ID).Find(&goal6)
// 						var goal7 models.SpGoal7
// 						db.Where("sp = ?", sp.ID).Find(&goal7)
// 						var goal8 models.SpGoal8
// 						db.Where("sp = ?", sp.ID).Find(&goal8)

// 						var outSp models.OutClientSCMSp
// 						outSp.ID = int(sp.ID)
// 						outSp.Client = sp.Client
// 						outSp.Scm = sp.Scm
// 						outSp.Developmentdate = sp.Developmentdate
// 						outSp.Axiscode = sp.Axiscode
// 						outSp.Axiscodedescription = sp.Axiscodedescription
// 						outSp.Tcm = sp.Tcm
// 						outSp.Goal1 = goal1
// 						outSp.Goal2 = goal2
// 						outSp.Goal3 = goal3
// 						outSp.Goal4 = goal4
// 						outSp.Goal5 = goal5
// 						outSp.Goal6 = goal6
// 						outSp.Goal7 = goal7
// 						outSp.Goal8 = goal8
// 						outSp.Signaturetcm = sp.Signatureqa
// 						outSp.Signaturetcmdate = sp.Signaturetcmdate
// 						outSp.Supervisor = sp.Supervisor
// 						outSp.Signaturesupervisor = sp.Signaturesupervisor
// 						outSp.Signaturesupervisordate = sp.Signaturesupervisordate
// 						outSp.Qa = sp.Qa
// 						outSp.Signatureqa = sp.Signatureqa
// 						outSp.Signatureqadate = sp.Signatureqadate

// 						scm = append(scm, models.OutClientSCM{
// 							ID:          int(cm.ID),
// 							Status:      cm.Status,
// 							Doa:         cm.Doa,
// 							ClosingDate: cm.ClosingDate,
// 						})
// 					}

// 					clients = append(clients, models.OutClients{
// 						ID:              client.ID,
// 						ReferrerID:      client.ReferrerID,
// 						ReferringAgency: client.ReferringAgency,
// 						ReferringPerson: client.ReferringPerson,
// 						CellPhone:       client.CellPhone,
// 						Fax:             client.Fax,
// 						Email:           client.Email,
// 						Date:            client.Date,

// 						LastName:  client.LastName,
// 						FirstName: client.FirstName,
// 						SS:        client.SS,
// 						DOB:       client.DOB,
// 						Sexo:      client.Sexo,
// 						Race:      client.Race,

// 						Address: client.Address,
// 						State:   client.State,
// 						ZipCode: client.ZipCode,

// 						Phone:    client.Phone,
// 						School:   client.School,
// 						Lenguage: client.Lenguage,

// 						SingClient: client.SingClient,

// 						LegalGuardian:     client.LegalGuardian,
// 						Relationship:      client.Relationship,
// 						CellPhoneGuardian: client.CellPhoneGuardian,
// 						SingGuardian:      client.SingGuardian,

// 						Medicaid:       client.Medicaid,
// 						GoldCardNumber: client.GoldCardNumber,
// 						Medicare:       client.Medicare,
// 						Scm:            scm,
// 					})
// 				}
// 				// --------------

// 				outTCM = append(outTCM, models.OutTCM{
// 					ID:      i + 1,
// 					Info:    tcmInfo,
// 					Clients: clients,
// 				})
// 			}

// 			// -------
// 			tcms = append(tcms, models.OutTCMS{
// 				ID:      k + 1,
// 				Info:    userInfo,
// 				ListTcm: outTCM,
// 			})
// 		}

// 		return tcms
// 	})
// 	if err != nil {
// 		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
// 			"message": "Error",
// 		})
// 	}

// 	// Return the list of users
// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"tcms": result.([]models.OutTCMS),
// 	})
// }
