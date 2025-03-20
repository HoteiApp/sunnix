package controllers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

func CoreListRequestNewClients(c *fiber.Ctx) error {
	var requests []models.RequestNewClient
	result, err := database.WithDB(func(db *gorm.DB) interface{} {
		// Query the database for all users
		result := db.Model(&models.RequestNewClient{}).Find(&requests)
		return result
	})
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "Error",
		})
	}
	if result.(*gorm.DB).RowsAffected > 0 {
		// Return the list of users
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "List Requests New Clients",
			"request": requests,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "No users found",
	})
}

// New Request Client
func ClientsRequestNewClientePut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormRequestNewClient
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.RequestNewClient
		request.ClientId = requestData.Requestnewclient.ClientId
		request.ReferrerID = uint(claims["ID"].(float64))
		request.ReferringAgency = requestData.Requestnewclient.ReferringAgency
		request.ReferringPerson = requestData.Requestnewclient.ReferringPerson
		request.CellPhone = requestData.Requestnewclient.CellPhone
		request.Fax = requestData.Requestnewclient.Fax
		request.Email = requestData.Requestnewclient.Email
		request.Date = requestData.Requestnewclient.Date

		request.LastName = requestData.Requestnewclient.LastName
		request.FirstName = requestData.Requestnewclient.FirstName
		request.SS = requestData.Requestnewclient.SS
		request.DOB = requestData.Requestnewclient.Dob
		request.Sexo = requestData.Requestnewclient.Sexo
		request.Race = requestData.Requestnewclient.Race

		request.Address = requestData.Requestnewclient.Address
		request.State = requestData.Requestnewclient.State
		request.ZipCode = requestData.Requestnewclient.ZipCode

		request.Phone = requestData.Requestnewclient.Phone
		request.School = requestData.Requestnewclient.School
		request.Lenguage = requestData.Requestnewclient.Lenguage

		request.LegalGuardian = requestData.Requestnewclient.LegalGuardian
		request.Relationship = requestData.Requestnewclient.Relationship
		request.CellPhoneGuardian = requestData.Requestnewclient.CellPhoneGuardian

		request.Medicaid = requestData.Requestnewclient.Medicalid
		request.GoldCardNumber = requestData.Requestnewclient.GoldCardNumber
		request.Medicare = requestData.Requestnewclient.Medicare
		request.PlanName = requestData.Requestnewclient.PlanName
		request.PlanID = requestData.Requestnewclient.PlanID

		// request.Reason = requestData.Requestnewclient.Reason
		request.Evaluation = requestData.Requestnewclient.Evaluation

		request.MentalPrimary = requestData.Requestnewclient.MentalPrimary
		request.MentalPrimaryDate = requestData.Requestnewclient.MentalPrimaryDate
		request.MentalSecondary = requestData.Requestnewclient.MentalSecondary
		request.MentalSecondaryDate = requestData.Requestnewclient.MentalSecondaryDate

		request.CaseManagement = requestData.Requestnewclient.CaseManagement
		request.IndividualTherapy = requestData.Requestnewclient.IndividualTherapy
		request.FamilyTherapy = requestData.Requestnewclient.FamilyTherapy
		request.AdultPsr = requestData.Requestnewclient.AdultPsr
		request.Psychiatrist = requestData.Requestnewclient.Psychiatrist
		request.Other = requestData.Requestnewclient.Other

		return db.Save(&request)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "ADD_REQUEST_NEW_CLIENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      0,
		// 	Description: "Information saved correctly",
		// }
		// Enviar el mensaje a Telegram
		go func() {
			message := "User: " + claims["UID"].(string)
			if requestData.Requestnewclient.ClientId == 0 {
				message += ": ADD_REQUEST_NEW_CLIENT : " + requestData.Requestnewclient.FirstName + " " + requestData.Requestnewclient.LastName
			} else {
				message += ": ADD_NEW_ADMISSION_CLIENT : " + requestData.Requestnewclient.FirstName + " " + requestData.Requestnewclient.LastName
			}
			if err := Webhook(message); err != nil {
				fmt.Println(err)
			}
		}()
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ClientsRequestEditClientePost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormRequestEditClient
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.Clients
		// Buscar la entrada existente por ID
		if err := db.Where("ID = ?", requestData.Editclient.ID).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		// Actualizar los campos de la entrada existente
		request.ReferringAgency = requestData.Editclient.ReferringAgency
		request.ReferringPerson = requestData.Editclient.ReferringPerson
		request.CellPhone = requestData.Editclient.CellPhone
		request.Fax = requestData.Editclient.Fax
		request.Email = requestData.Editclient.Email
		request.Date = requestData.Editclient.Date
		request.LastName = requestData.Editclient.LastName
		request.FirstName = requestData.Editclient.FirstName
		request.SS = requestData.Editclient.Ss
		request.DOB = requestData.Editclient.Dob
		request.Sexo = requestData.Editclient.Sexo
		request.Race = requestData.Editclient.Race
		request.Address = requestData.Editclient.Address
		request.State = requestData.Editclient.State
		request.ZipCode = requestData.Editclient.ZipCode
		request.Phone = requestData.Editclient.Phone
		request.School = requestData.Editclient.School
		request.Lenguage = requestData.Editclient.Lenguage
		request.SingClient = requestData.Editclient.SingClient
		request.LegalGuardian = requestData.Editclient.LegalGuardian
		request.Relationship = requestData.Editclient.Relationship
		request.CellPhoneGuardian = requestData.Editclient.CellPhoneGuardian
		request.SingGuardian = requestData.Editclient.SingGuardian
		request.Medicaid = requestData.Editclient.Medicalid
		request.GoldCardNumber = requestData.Editclient.GoldCardNumber
		request.Medicare = requestData.Editclient.Medicare

		db.Save(&request)
		if db.Error != nil {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"status":  209,
				"message": db.Error,
			})
		} else {
			// var sure models.ClientSCMSure
			// // Buscar la entrada existente por ID
			// if err := db.Where("ID = ?", requestData.Editsure.ID).First(&sure).Error; err != nil {
			// 	// Manejar el caso en el que no se encuentra la entrada
			// 	return false
			// }

			// Actualizar los campos de la entrada existente
			// sure.PlanName = requestData.Editsure.PlanName
			// sure.PlanID = requestData.Editsure.PlanID

			// db.Save(&sure)
			if db.Error != nil {
				return false
			} else {
				var medical models.ClientSCMMedical
				// Buscar la entrada existente por ID
				if err := db.Where("ID = ?", requestData.Editmedical.ID).First(&medical).Error; err != nil {
					// Manejar el caso en el que no se encuentra la entrada
					return false
				}

				// Actualizar los campos de la entrada existente
				medical.MedicalPcp = requestData.Editmedical.MedicalPcp
				medical.MedicalPcpAddress = requestData.Editmedical.MedicalPcpAddress
				medical.MedicalPcpPhone = requestData.Editmedical.MedicalPcpPhone
				medical.MedicalPsychiatrisy = requestData.Editmedical.MedicalPsychiatrisy
				medical.MedicalPsychiatrisyAddress = requestData.Editmedical.MedicalPsychiatrisyAddress
				medical.MedicalPsychiatrisyPhone = requestData.Editmedical.MedicalPsychiatrisyPhone

				db.Save(&medical)
				if db.Error != nil {
					return false
				} else {
					var mental models.ClientSCMMental
					// Buscar la entrada existente por ID
					if err := db.Where("ID = ?", requestData.Editmental.ID).First(&mental).Error; err != nil {
						// Manejar el caso en el que no se encuentra la entrada
						return false
					}

					// Actualizar los campos de la entrada existente
					mental.MentalPrimary = requestData.Editmental.MentalPrimary
					mental.MentalPrimaryDate = requestData.Editmental.MentalPrimaryDate
					mental.MentalSecondary = requestData.Editmental.MentalSecondary
					mental.MentalSecondaryDate = requestData.Editmental.MentalSecondaryDate

					db.Save(&mental)
				}
			}
		}

		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "UPDATE_CLIENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      requestData.Editclient.ID,
		// 	Description: "Information saved correctly",
		// }
		return true
	})

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Client updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// TODO Ahi que detecar el error cuando se duplica un scm para enviarelo a front
func ClientsRequestEditSCMClientePost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormRequestEditClient
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.ClientSCMDemografic
		// Buscar la entrada existente por ID
		if err := db.Where("ID = ?", requestData.Editclient.ID).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return err
		}

		// Actualizar los campos de la entrada existente
		request.ReferringAgency = requestData.Editclient.ReferringAgency
		request.ReferringPerson = requestData.Editclient.ReferringPerson
		request.CellPhone = requestData.Editclient.CellPhone
		request.Fax = requestData.Editclient.Fax
		request.Email = requestData.Editclient.Email
		request.Date = requestData.Editclient.Date
		request.LastName = requestData.Editclient.LastName
		request.FirstName = requestData.Editclient.FirstName
		request.SS = requestData.Editclient.Ss
		request.DOB = requestData.Editclient.Dob
		request.Sexo = requestData.Editclient.Sexo
		request.Race = requestData.Editclient.Race
		request.Address = requestData.Editclient.Address
		request.State = requestData.Editclient.State
		request.ZipCode = requestData.Editclient.ZipCode
		request.Phone = requestData.Editclient.Phone
		request.School = requestData.Editclient.School
		request.Lenguage = requestData.Editclient.Lenguage
		request.SingClient = requestData.Editclient.SingClient
		request.LegalGuardian = requestData.Editclient.LegalGuardian
		request.Relationship = requestData.Editclient.Relationship
		request.CellPhoneGuardian = requestData.Editclient.CellPhoneGuardian
		request.SingGuardian = requestData.Editclient.SingGuardian
		request.Medicaid = requestData.Editclient.Medicalid
		request.GoldCardNumber = requestData.Editclient.GoldCardNumber
		request.Medicare = requestData.Editclient.Medicare

		db.Save(&request)

		if db.Error != nil {
			fmt.Println("----------------------------", db.Error)
			return db.Error
		}
		var client models.Clients
		// Buscar la entrada existente por ID
		if err := db.Where("ID = ?", requestData.Editclient.ID).First(&client).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return err
		}
		// Actualizar los campos de la entrada existente
		client.ReferringAgency = request.ReferringAgency
		client.ReferringPerson = request.ReferringPerson
		client.CellPhone = request.CellPhone
		client.Fax = request.Fax
		client.Email = request.Email
		client.Date = request.Date
		client.LastName = request.LastName
		client.FirstName = request.FirstName
		client.SS = request.SS
		client.DOB = request.DOB
		client.Sexo = request.Sexo
		client.Race = request.Race
		client.Address = request.Address
		client.State = request.State
		client.ZipCode = request.ZipCode
		client.Phone = request.Phone
		client.School = request.School
		client.Lenguage = request.Lenguage
		client.SingClient = request.SingClient
		client.LegalGuardian = request.LegalGuardian
		client.Relationship = request.Relationship
		client.CellPhoneGuardian = request.CellPhoneGuardian
		client.SingGuardian = request.SingGuardian
		client.Medicaid = request.Medicaid
		client.GoldCardNumber = request.GoldCardNumber
		client.Medicare = request.Medicare
		db.Save(&client)
		if db.Error != nil {
			return db.Error
		} else {
			// var sure models.ClientSCMSure
			// // Buscar la entrada existente por ID
			// // BUG: Arreglar aqui
			// if err := db.Where("ID = ?", requestData.Editsure.ID).First(&sure).Error; err != nil {
			// 	// Manejar el caso en el que no se encuentra la entrada
			// 	return err
			// }

			// // Actualizar los campos de la entrada existente
			// sure.PlanName = requestData.Editsure.PlanName
			// sure.PlanID = requestData.Editsure.PlanID

			// db.Save(&sure)
			if db.Error != nil {
				return db.Error
			} else {
				var medical models.ClientSCMMedical
				// Buscar la entrada existente por ID
				if err := db.Where("ID = ?", requestData.Editmedical.ID).First(&medical).Error; err != nil {
					// Manejar el caso en el que no se encuentra la entrada
					return err
				}

				// Actualizar los campos de la entrada existente
				medical.MedicalPcp = requestData.Editmedical.MedicalPcp
				medical.MedicalPcpAddress = requestData.Editmedical.MedicalPcpAddress
				medical.MedicalPcpPhone = requestData.Editmedical.MedicalPcpPhone
				medical.MedicalPsychiatrisy = requestData.Editmedical.MedicalPsychiatrisy
				medical.MedicalPsychiatrisyAddress = requestData.Editmedical.MedicalPsychiatrisyAddress
				medical.MedicalPsychiatrisyPhone = requestData.Editmedical.MedicalPsychiatrisyPhone

				db.Save(&medical)
				if db.Error != nil {
					return db.Error
				} else {
					var mental models.ClientSCMMental
					// Buscar la entrada existente por ID
					if err := db.Where("ID = ?", requestData.Editmental.ID).First(&mental).Error; err != nil {
						// Manejar el caso en el que no se encuentra la entrada
						return err
					}

					// Actualizar los campos de la entrada existente
					mental.MentalPrimary = requestData.Editmental.MentalPrimary
					mental.MentalPrimaryDate = requestData.Editmental.MentalPrimaryDate
					mental.MentalSecondary = requestData.Editmental.MentalSecondary
					mental.MentalSecondaryDate = requestData.Editmental.MentalSecondaryDate

					db.Save(&mental)
				}
			}
		}

		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "UPDATE_SCM_CLIENT",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      requestData.Editclient.ID,
		// 	Description: "Information saved correctly",
		// }
		return true
	})
	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Client updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"status":  209,
		"message": result,
	})
}

func ClientsRequestAddSCMSurePut(c *fiber.Ctx) error {
	var requestData models.FormRequestAddSure
	if err := c.BodyParser(&requestData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request data"})
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {

		var sureActive models.ClientSCMSure
		if err := db.Where("scm = ? AND active = ?", requestData.Addsure.ID, true).First(&sureActive).Error; err == nil {
			sureActive.Active = false
			if err := db.Save(&sureActive).Error; err != nil {
				return false
			}
		}

		var scm models.ClientServiceCaseManagement
		if err := db.Where("id = ?", requestData.Addsure.ID).First(&scm).Error; err != nil {
			return false
		}

		scm.Status = "Pending"
		db.Save(&scm)

		sure := models.ClientSCMSure{
			Scm:           uint(requestData.Addsure.ID),
			PlanName:      requestData.Addsure.PlanName,
			PlanID:        requestData.Addsure.PlanID,
			Auth:          requestData.Addsure.Auth,
			Deny:          requestData.Addsure.Deny,
			AuthDateStart: requestData.Addsure.AuthDateStart,
			AuthDateEnd:   requestData.Addsure.AuthDateEnd,
			Unit:          int64(requestData.Addsure.Unit),
			TimeRange:     int64(requestData.Addsure.TimeRange),
			Active:        requestData.Addsure.Active,
		}

		if err := db.Save(&sure).Error; err != nil {
			return false
		} else {
			// -- Add folder in S3
			// -- clients/id_client/id_scm/id_insurace/
			nameFormder := "clients/" + strconv.Itoa(int(scm.Client)) + "/" + strconv.Itoa(int(scm.ID)) + "/" + strconv.Itoa(int(sure.ID)) + "/"
			_ = core.ExtractFunctionsPlugins("s3", "CreateFolder", nameFormder)

			addFileSure := models.ClientSCMSureFilesInCloud{
				Scm:           uint(requestData.Addsure.ID),
				Sure:          sure.ID,
				Auth:          false,
				Certification: false,
				Assessment:    false,
				Sp:            false,
				Evaluation:    false,
			}
			if err := db.Save(&addFileSure).Error; err != nil {
				return false
			}

		}

		return true
	})

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Insurance add correctly"})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{"status": 209, "message": "Error creating insurance"})
}

func ClientsRequestEditSCMSurePost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormRequestEditSure
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.ClientSCMSure
		// Buscar la entrada existente por ID
		if err := db.Where("ID = ?", requestData.Editsure.ID).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return err
		}

		request.PlanName = requestData.Editsure.PlanName
		request.PlanID = requestData.Editsure.PlanID
		request.Auth = requestData.Editsure.Auth
		request.Deny = requestData.Editsure.Deny
		request.AuthDateStart = requestData.Editsure.AuthDateStart
		request.AuthDateEnd = requestData.Editsure.AuthDateEnd
		request.Unit = int64(requestData.Editsure.Unit)
		request.TimeRange = int64(requestData.Editsure.TimeRange)
		request.Active = requestData.Editsure.Active

		db.Save(&request)
		if db.Error != nil {
			fmt.Println("----------------------------", db.Error)
			return db.Error
		}
		return true
	})
	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Insurance updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"status":  209,
		"message": result,
	})
}
func ClientsRequestSubmitCMSurePost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormRequestSubmitSure
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.ClientSCMSure
		// Buscar la entrada existente por ID
		if err := db.Where("ID = ?", requestData.SubmnitSure.ID).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return err
		}

		request.PlanName = requestData.SubmnitSure.PlanName
		request.PlanID = requestData.SubmnitSure.PlanID
		request.Auth = requestData.SubmnitSure.Auth
		request.Deny = requestData.SubmnitSure.Deny
		request.AuthDateStart = requestData.SubmnitSure.AuthDateStart
		request.AuthDateEnd = requestData.SubmnitSure.AuthDateEnd
		request.Unit = int64(requestData.SubmnitSure.Unit)
		request.TimeRange = int64(requestData.SubmnitSure.TimeRange)

		request.Tcm = requestData.SubmnitSure.Tcm
		request.Submit = requestData.SubmnitSure.Submit
		request.Supervisor = requestData.SubmnitSure.Supervisor
		request.SupervisorAprobbe = requestData.SubmnitSure.SupervisorAprobbe
		request.Qa = requestData.SubmnitSure.Qa
		request.QaAprobbe = requestData.SubmnitSure.QaAprobbe

		if request.Submit && request.SupervisorAprobbe && request.QaAprobbe {
			var scm models.ClientServiceCaseManagement
			if err := db.Where("id = ?", requestData.SubmnitSure.Scm).First(&scm).Error; err != nil {
				return false
			}
			scm.Status = "Open"
			db.Save(&scm)
		}

		db.Save(&request)
		if db.Error != nil {
			fmt.Println("----------------------------", db.Error)
			return db.Error
		}
		return true
	})
	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Insurance updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"status":  209,
		"message": result,
	})
}

func ClientsRequestEditSCMCertificationPost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormEditCertification
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.ClientSCMCertification
		// Buscar la entrada existente por ID
		if err := db.Where("scm = ?", requestData.Editcertification.Scm).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		// Actualizar los campos de la entrada existente
		request.Select1 = requestData.Editcertification.Select1
		request.Select2 = requestData.Editcertification.Select2
		request.Select3 = requestData.Editcertification.Select3
		request.Select4 = requestData.Editcertification.Select4
		request.Select5 = requestData.Editcertification.Select5
		request.Select6 = requestData.Editcertification.Select6
		request.Select7 = requestData.Editcertification.Select7
		request.Select8 = requestData.Editcertification.Select8
		request.Select8a = requestData.Editcertification.Select8a
		request.Select8b = requestData.Editcertification.Select8b
		request.Select8c = requestData.Editcertification.Select8c
		request.Select8d = requestData.Editcertification.Select8d
		request.Select8e = requestData.Editcertification.Select8e
		request.Select9 = requestData.Editcertification.Select9

		// ---
		plainImageTCM, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editcertification.Signtcm, "data:image/png;base64,", "", -1))
		encryptedSignTCM, _ := core.EncryptImage(plainImageTCM)
		// ---
		plainImageTCMS, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editcertification.Signsupervisor, "data:image/png;base64,", "", -1))
		encryptedSignTCMS, _ := core.EncryptImage(plainImageTCMS)
		// ---
		plainImageQa, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editcertification.Signqa, "data:image/png;base64,", "", -1))
		encryptedSignQa, _ := core.EncryptImage(plainImageQa)
		// ---
		request.Tcm = requestData.Editcertification.Tcm
		request.Nametcm = requestData.Editcertification.Nametcm
		request.Categorytcm = requestData.Editcertification.Categorytcm
		request.Signtcm = encryptedSignTCM
		request.Datetcm = requestData.Editcertification.Datetcm

		request.Supervisor = requestData.Editcertification.Supervisor
		request.NameSupervisor = requestData.Editcertification.NameSupervisor
		request.Categorysupervisor = requestData.Editcertification.Categorysupervisor
		request.Signsupervisor = encryptedSignTCMS
		request.Datesupervisor = requestData.Editcertification.Datesupervisor

		request.Qa = requestData.Editcertification.Qa
		request.Signqa = encryptedSignQa

		db.Save(&request)
		if db.Error != nil {
			return false
		}

		var scm models.ClientServiceCaseManagement
		db.Where("ID = ?", request.Scm).Find(&scm)
		// TODO: Agregar logs y notificacion
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "UPDATE_SCM_Certification",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      int(scm.Client),
		// 	Description: "Information saved correctly",
		// }
		return true
	})

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Client updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ClientsRequestEditSCMAssessmentPost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormEditAssessment
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.ClientSCMAssessment
		// Buscar la entrada existente por ID
		if err := db.Where("scm = ?", requestData.Editassessment.Scm).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		// Actualizar los campos de la entrada existente
		request.Sourceinforemationclient = requestData.Editassessment.Sourceinforemationclient
		request.Sourceinforemationdfc = requestData.Editassessment.Sourceinforemationdfc
		request.Sourceinforemationbff = requestData.Editassessment.Sourceinforemationbff
		request.Sourceinforemationbffisyes = requestData.Editassessment.Sourceinforemationbffisyes
		request.Sourceinforemationcpa = requestData.Editassessment.Sourceinforemationcpa
		request.Sourceinforemationsdp = requestData.Editassessment.Sourceinforemationsdp
		request.Sourceinforemationpp = requestData.Editassessment.Sourceinforemationpp
		request.Sourceinforemationppisyes = requestData.Editassessment.Sourceinforemationppisyes
		request.Sourceinforemationff = requestData.Editassessment.Sourceinforemationff
		request.Sourceinforemationldrsi1 = requestData.Editassessment.Sourceinforemationldrsi1
		request.Sourceinforemationldrsi2 = requestData.Editassessment.Sourceinforemationldrsi2
		request.Sourceinforemationldrsi3 = requestData.Editassessment.Sourceinforemationldrsi3
		request.Sourceinforemationldrsi4 = requestData.Editassessment.Sourceinforemationldrsi4
		request.Sourceinforemationldrsi5 = requestData.Editassessment.Sourceinforemationldrsi5
		request.Sourceinforemationldrsi6 = requestData.Editassessment.Sourceinforemationldrsi6
		request.Sourceinforemationldrsi7 = requestData.Editassessment.Sourceinforemationldrsi7
		request.Sourceinforemationldrsi8 = requestData.Editassessment.Sourceinforemationldrsi8
		request.SourceinforemationldrsiOther = requestData.Editassessment.SourceInforemationLdrsiOther
		request.Presentproblems = requestData.Editassessment.Presentproblems
		request.Clientlegalrepresentative = requestData.Editassessment.Clientlegalrepresentative
		request.Listrecipientstrengths = requestData.Editassessment.Listrecipientstrengths
		request.Listrecipientstrengths1 = requestData.Editassessment.Listrecipientstrengths1
		request.Listrecipientstrengths2 = requestData.Editassessment.Listrecipientstrengths2
		request.Listrecipientstrengths3 = requestData.Editassessment.Listrecipientstrengths3
		request.Listrecipientstrengths4 = requestData.Editassessment.Listrecipientstrengths4
		request.Listrecipientweakness = requestData.Editassessment.Listrecipientweakness
		request.Listrecipientweakness1 = requestData.Editassessment.Listrecipientweakness1
		request.Listrecipientweakness2 = requestData.Editassessment.Listrecipientweakness2
		request.Listrecipientweakness3 = requestData.Editassessment.Listrecipientweakness3
		request.Listrecipientweakness4 = requestData.Editassessment.Listrecipientweakness4
		request.Listresources = requestData.Editassessment.Listresources
		request.Psyfamily1A = requestData.Editassessment.Psyfamily1A
		request.Psyfamily1Aroom = requestData.Editassessment.Psyfamily1Aroom
		request.Psyfamily1Abath = requestData.Editassessment.Psyfamily1Abath
		request.Psyfamily1B = requestData.Editassessment.Psyfamily1B
		request.Psyfamily1C = requestData.Editassessment.Psyfamily1C
		request.Psyfamily1Cmpsr = requestData.Editassessment.Psyfamily1Cmpsr
		request.Psyfamily1D = requestData.Editassessment.Psyfamily1D
		request.Psyfamily1Dmpsb = requestData.Editassessment.Psyfamily1Dmpsb
		request.Psyfamily1E = requestData.Editassessment.Psyfamily1E
		request.Psyfamily1Eifyes = requestData.Editassessment.Psyfamily1Eifyes
		request.Psyfamily2A = requestData.Editassessment.Psyfamily2A
		request.Psyfamily2B = requestData.Editassessment.Psyfamily2B
		request.Psyfamily3 = requestData.Editassessment.Psyfamily3
		request.Psyfamily3Ifyes = requestData.Editassessment.Psyfamily3Ifyes
		request.Psyfamily4 = requestData.Editassessment.Psyfamily4
		request.Psyfamily51 = requestData.Editassessment.Psyfamily51
		request.Psyfamily52 = requestData.Editassessment.Psyfamily52
		request.Psyfamily53 = requestData.Editassessment.Psyfamily53
		request.Psyfamily54 = requestData.Editassessment.Psyfamily54
		request.Psyfamily55 = requestData.Editassessment.Psyfamily55
		request.Psyfamily56 = requestData.Editassessment.Psyfamily56
		request.Psyfamily57 = requestData.Editassessment.Psyfamily57
		request.Psyfamily58 = requestData.Editassessment.Psyfamily58
		request.Psyfamily59 = requestData.Editassessment.Psyfamily59
		request.Psyfamily510 = requestData.Editassessment.Psyfamily510
		request.Psyfamily511 = requestData.Editassessment.Psyfamily511
		request.Psyfamily512 = requestData.Editassessment.Psyfamily512
		request.Psyfamily513 = requestData.Editassessment.Psyfamily513
		request.Psyfamily514 = requestData.Editassessment.Psyfamily514
		request.Psyfamily515 = requestData.Editassessment.Psyfamily515
		request.Psyfamily516 = requestData.Editassessment.Psyfamily516
		request.Psymedicalhistorycountryp = requestData.Editassessment.Psymedicalhistorycountryp
		request.Psymedicalhistoryusap = requestData.Editassessment.Psymedicalhistoryusap
		request.Psymedicalhistorycountry1 = requestData.Editassessment.Psymedicalhistorycountry1
		request.Psymedicalhistorycountry1Ifyes = requestData.Editassessment.Psymedicalhistorycountry1Ifyes
		request.Psymedicalhistoryusa1 = requestData.Editassessment.Psymedicalhistoryusa1
		request.Psymedicalhistoryusa1Ifyes = requestData.Editassessment.Psymedicalhistoryusa1Ifyes
		request.Psymedicalhistorycountry2 = requestData.Editassessment.Psymedicalhistorycountry2
		request.Psymedicalhistoryusa2 = requestData.Editassessment.Psymedicalhistoryusa2
		request.Psymedicalhistorycountry3 = requestData.Editassessment.Psymedicalhistorycountry3
		request.Psymedicalhistoryusa3 = requestData.Editassessment.Psymedicalhistoryusa3
		request.Psymedicalhistorycountry4 = requestData.Editassessment.Psymedicalhistorycountry4
		request.Psymedicalhistoryusa4 = requestData.Editassessment.Psymedicalhistoryusa4
		request.Psymedicalhistorycountry5 = requestData.Editassessment.Psymedicalhistorycountry5
		request.Psymedicalhistorycountry5Ifyes = requestData.Editassessment.Psymedicalhistorycountry5Ifyes
		request.Psymedicalhistoryusa5 = requestData.Editassessment.Psymedicalhistoryusa5
		request.Psymedicalhistoryusa5Ifyes = requestData.Editassessment.Psymedicalhistoryusa5Ifyes
		request.Psymedicalhistorycountry6 = requestData.Editassessment.Psymedicalhistorycountry6
		request.Psymedicalhistorycountry6Ifyes = requestData.Editassessment.Psymedicalhistorycountry6Ifyes
		request.Psymedicalhistoryusa6 = requestData.Editassessment.Psymedicalhistoryusa6
		request.Psymedicalhistoryusa6Ifyes = requestData.Editassessment.Psymedicalhistoryusa6Ifyes
		request.Psymedicalhistorycountry7 = requestData.Editassessment.Psymedicalhistorycountry7
		request.Psymedicalhistoryusa7 = requestData.Editassessment.Psymedicalhistoryusa7
		request.Psymedicalhistorycountry8 = requestData.Editassessment.Psymedicalhistorycountry8
		request.Psymedicalhistoryusa8 = requestData.Editassessment.Psymedicalhistoryusa8
		request.Psymedicalhistorycountry9 = requestData.Editassessment.Psymedicalhistorycountry9
		request.Psymedicalhistoryusa9 = requestData.Editassessment.Psymedicalhistoryusa9
		request.Psymedicalhistorycountry10 = requestData.Editassessment.Psymedicalhistorycountry10
		request.Psymedicalhistorycountry10Ifyes = requestData.Editassessment.Psymedicalhistorycountry10Ifyes
		request.Psymedicalhistoryusa10 = requestData.Editassessment.Psymedicalhistoryusa10
		request.Psymedicalhistoryusa10Ifyes = requestData.Editassessment.Psymedicalhistoryusa10Ifyes
		request.PsymedicalhistoryfamilyMotherMental = requestData.Editassessment.PsymedicalhistoryfamilyMotherMental
		request.PsymedicalhistoryfamilyMotherMedical = requestData.Editassessment.PsymedicalhistoryfamilyMotherMedical
		request.PsymedicalhistoryfamilyFatherMental = requestData.Editassessment.PsymedicalhistoryfamilyFatherMental
		request.PsymedicalhistoryfamilyFatherMedical = requestData.Editassessment.PsymedicalhistoryfamilyFatherMedical
		request.PsymedicalhistoryfamilySiblingsMental = requestData.Editassessment.PsymedicalhistoryfamilySiblingsMental
		request.PsymedicalhistoryfamilySiblingsMedical = requestData.Editassessment.PsymedicalhistoryfamilySiblingsMedical
		request.PsymedicalhistoryfamilyOtherMental = requestData.Editassessment.PsymedicalhistoryfamilyOtherMental
		request.PsymedicalhistoryfamilyOtherMedical = requestData.Editassessment.PsymedicalhistoryfamilyOtherMedical
		request.Currentmedication1 = requestData.Editassessment.Currentmedication1
		request.Dosage1 = requestData.Editassessment.Dosage1
		request.Prescribing1 = requestData.Editassessment.Prescribing1
		request.Currentmedication2 = requestData.Editassessment.Currentmedication2
		request.Dosage2 = requestData.Editassessment.Dosage2
		request.Prescribing2 = requestData.Editassessment.Prescribing2
		request.Currentmedication3 = requestData.Editassessment.Currentmedication3
		request.Dosage3 = requestData.Editassessment.Dosage3
		request.Prescribing3 = requestData.Editassessment.Prescribing3
		request.Currentmedication4 = requestData.Editassessment.Currentmedication4
		request.Dosage4 = requestData.Editassessment.Dosage4
		request.Prescribing4 = requestData.Editassessment.Prescribing4
		request.Currentmedication5 = requestData.Editassessment.Currentmedication5
		request.Dosage5 = requestData.Editassessment.Dosage5
		request.Prescribing5 = requestData.Editassessment.Prescribing5
		request.Currentmedication6 = requestData.Editassessment.Currentmedication6
		request.Dosage6 = requestData.Editassessment.Dosage6
		request.Prescribing6 = requestData.Editassessment.Prescribing6
		request.Currentmedication7 = requestData.Editassessment.Currentmedication7
		request.Dosage7 = requestData.Editassessment.Dosage7
		request.Prescribing7 = requestData.Editassessment.Prescribing7
		request.Currentmedication8 = requestData.Editassessment.Currentmedication8
		request.Dosage8 = requestData.Editassessment.Dosage8
		request.Prescribing8 = requestData.Editassessment.Prescribing8
		request.Currentmedication9 = requestData.Editassessment.Currentmedication9
		request.Dosage9 = requestData.Editassessment.Dosage9
		request.Prescribing9 = requestData.Editassessment.Prescribing9
		request.Currentmedication10 = requestData.Editassessment.Currentmedication10
		request.Dosage10 = requestData.Editassessment.Dosage10
		request.Prescribing10 = requestData.Editassessment.Prescribing10
		request.SubstanceAlcohol = requestData.Editassessment.SubstanceAlcohol
		request.SubstanceMethadone = requestData.Editassessment.SubstanceMethadone
		request.SubstanceStimulants = requestData.Editassessment.SubstanceStimulants
		request.SubstanceHallucinogens = requestData.Editassessment.SubstanceHallucinogens
		request.SubstanceNarcotics = requestData.Editassessment.SubstanceNarcotics
		request.SubstanceTranquilizers = requestData.Editassessment.SubstanceTranquilizers
		request.SubstanceInhalants = requestData.Editassessment.SubstanceInhalants
		request.SubstancePain = requestData.Editassessment.SubstancePain
		request.SubstanceOther = requestData.Editassessment.SubstanceOther
		request.SubstanceMarijuana = requestData.Editassessment.SubstanceMarijuana
		request.SubstanceSleeping = requestData.Editassessment.SubstanceSleeping
		request.SubstanceOther1 = requestData.Editassessment.SubstanceOther1
		request.SubstanceFamily = requestData.Editassessment.SubstanceFamily
		request.EducationPrimaryleng = requestData.Editassessment.EducationPrimaryleng
		request.EducationOtherlengs = requestData.Editassessment.EducationOtherlengs
		request.EducationCurrentSchool = requestData.Editassessment.EducationCurrentSchool
		request.EducationGradeLevel = requestData.Editassessment.EducationGradeLevel
		request.EducationSpecialEd = requestData.Editassessment.EducationSpecialEd
		request.EducationListGrades1 = requestData.Editassessment.EducationListGrades1
		request.EducationListGrades2 = requestData.Editassessment.EducationListGrades2
		request.EducationListGrades3 = requestData.Editassessment.EducationListGrades3
		request.WorkCurrent = requestData.Editassessment.WorkCurrent
		request.WorkPosition = requestData.Editassessment.WorkPosition
		request.WorkTime = requestData.Editassessment.WorkTime
		request.WorkHistory1 = requestData.Editassessment.WorkHistory1
		request.WorkHistory2 = requestData.Editassessment.WorkHistory2
		request.WorkHistory3 = requestData.Editassessment.WorkHistory3
		request.ServicesBeing1 = requestData.Editassessment.ServicesBeing1
		request.ServicesBeing2 = requestData.Editassessment.ServicesBeing2
		request.ServicesBeing3 = requestData.Editassessment.ServicesBeing3
		request.ServicesBeing4 = requestData.Editassessment.ServicesBeing4
		request.ServicesBeing5 = requestData.Editassessment.ServicesBeing5
		request.ServicesBeing6 = requestData.Editassessment.ServicesBeing6
		request.ServicesBeing7 = requestData.Editassessment.ServicesBeing7
		request.ServicesBeing8 = requestData.Editassessment.ServicesBeing8
		request.ServicesBeing9 = requestData.Editassessment.ServicesBeing9
		request.ServicesBeing10 = requestData.Editassessment.ServicesBeing10
		request.Servicesbeingother = requestData.Editassessment.Servicesbeingother
		request.Describeclientdoes = requestData.Editassessment.Describeclientdoes
		request.Describeclientconsidered = requestData.Editassessment.Describeclientconsidered
		request.Describeclientpeers = requestData.Editassessment.Describeclientpeers
		request.Describeclientinvolvement = requestData.Editassessment.Describeclientinvolvement
		request.Describeclientinvolvementifyes = requestData.Editassessment.Describeclientinvolvementifyes
		request.Describeclientassociates = requestData.Editassessment.Describeclientassociates
		request.Describeclientrelationship = requestData.Editassessment.Describeclientrelationship
		request.Describeclientrelationshipmany = requestData.Editassessment.Describeclientrelationshipmany
		request.Describeclientdescribe = requestData.Editassessment.Describeclientdescribe
		request.Recipent1 = requestData.Editassessment.Recipent1
		request.Recipent2 = requestData.Editassessment.Recipent2
		request.Recipent3 = requestData.Editassessment.Recipent3
		request.Recipent4 = requestData.Editassessment.Recipent4
		request.Recipent5 = requestData.Editassessment.Recipent5
		request.Recipent6 = requestData.Editassessment.Recipent6
		request.Recipent7 = requestData.Editassessment.Recipent7
		request.Recipent8 = requestData.Editassessment.Recipent8
		request.Discussion = requestData.Editassessment.Discussion
		request.Describeservicepsychiatrist = requestData.Editassessment.Describeservicepsychiatrist
		request.Describeservicepcp = requestData.Editassessment.Describeservicepcp
		request.Describeservicepsr = requestData.Editassessment.Describeservicepsr
		request.Describeserviceother = requestData.Editassessment.Describeserviceother
		request.Signatureopt = requestData.Editassessment.Signatureopt

		request.Tcm = requestData.Editassessment.Tcm
		request.Nametcm = requestData.Editassessment.Nametcm
		request.Categorytcm = requestData.Editassessment.Categorytcm
		request.Signaturetcmdate = requestData.Editassessment.Signaturetcmdate

		result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+requestData.Editassessment.Supervisor+"))")
		bytes, _ := json.Marshal(&result)
		var resultSearch ldap.SearchResult
		_ = json.Unmarshal(bytes, &resultSearch)

		if len(resultSearch.Entries) > 0 {
			userLdap := resultSearch.Entries[0]
			// FIXME: Aqui va los campos de la tabla de usuario exportados del LDAP
			id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
			request.Supervisor = int(id)
		}

		request.NameSupervisor = requestData.Editassessment.NameSupervisor
		request.CategorySupervisor = requestData.Editassessment.CategorySupervisor
		request.Signaturesupervisordate = requestData.Editassessment.Signaturesupervisordate

		request.Qa = requestData.Editassessment.Qa
		request.Signatureqadate = requestData.Editassessment.Signatureqadate
		// --
		// ---
		plainImageTCM, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editassessment.Signaturetcm, "data:image/png;base64,", "", -1))
		encryptedSignTCM, _ := core.EncryptImage(plainImageTCM)
		// ---
		plainImageTCMS, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editassessment.Signaturesupervisor, "data:image/png;base64,", "", -1))
		encryptedSignTCMS, _ := core.EncryptImage(plainImageTCMS)
		// ---
		plainImageQa, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editassessment.Signatureqa, "data:image/png;base64,", "", -1))
		encryptedSignQa, _ := core.EncryptImage(plainImageQa)

		request.Signaturetcm = encryptedSignTCM
		request.Signaturesupervisor = encryptedSignTCMS
		request.Signatureqa = encryptedSignQa

		db.Save(&request)
		if db.Error != nil {
			return false
		}

		var scm models.ClientServiceCaseManagement
		db.Where("ID = ?", request.Scm).Find(&scm)
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "UPDATE_SCM_Assessment",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      int(scm.Client),
		// 	Description: "Information saved correctly",
		// }
		return true
	})

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Client updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ClientsRequestEditSCMSpPost(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormEditSp
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var request models.ClientSCMSp
		// Buscar la entrada existente por ID
		if err := db.Where("scm = ?", requestData.Editsp.Scm).First(&request).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}
		// Actualizar los campos de la entrada existente

		// ---
		plainImageTCM, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editsp.Signaturetcm, "data:image/png;base64,", "", -1))
		encryptedSignTCM, _ := core.EncryptImage(plainImageTCM)
		// ---
		plainImageTCMS, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editsp.Signaturesupervisor, "data:image/png;base64,", "", -1))
		encryptedSignTCMS, _ := core.EncryptImage(plainImageTCMS)
		// ---
		plainImageQa, _ := base64.StdEncoding.DecodeString(strings.Replace(requestData.Editsp.Signatureqa, "data:image/png;base64,", "", -1))
		encryptedSignQa, _ := core.EncryptImage(plainImageQa)
		// ---

		request.Developmentdate = requestData.Editsp.Developmentdate
		request.Axiscode = requestData.Editsp.Axiscode
		request.Axiscodedescription = requestData.Editsp.Axiscodedescription

		request.Tcm = requestData.Editsp.Tcm
		request.Nametcm = requestData.Editsp.Nametcm
		request.Categorytcm = requestData.Editsp.Categorytcm
		request.Signaturetcm = encryptedSignTCM
		request.Signaturetcmdate = requestData.Editsp.Signaturetcmdate

		request.Supervisor = requestData.Editsp.Supervisor
		request.NameSupervisor = requestData.Editsp.NameSupervisor
		request.CategorySupervisor = requestData.Editsp.CategorySupervisor
		request.Signaturesupervisor = encryptedSignTCMS
		request.Signaturesupervisordate = requestData.Editsp.Signaturesupervisordate

		request.Qa = requestData.Editsp.Qa
		request.Signatureqa = encryptedSignQa
		request.Signatureqadate = requestData.Editsp.Signatureqadate

		db.Save(&request)
		if db.Error != nil {
			return false
		}

		var requestGoal1 models.SpGoal1
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal1).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		requestGoal1.Goal1A1 = requestData.Editsp.Goal1A1
		requestGoal1.Goal1A1Type = requestData.Editsp.Goal1A1Type
		requestGoal1.Goal1A1Long = requestData.Editsp.Goal1A1Long
		requestGoal1.Goal1A1Responsible = requestData.Editsp.Goal1A1Responsible
		requestGoal1.Goal1A1Startdate = requestData.Editsp.Goal1A1Startdate
		requestGoal1.Goal1A1Targetdate = requestData.Editsp.Goal1A1Targetdate
		requestGoal1.Goal1A2 = requestData.Editsp.Goal1A2
		requestGoal1.Goal1A2Type = requestData.Editsp.Goal1A2Type
		requestGoal1.Goal1A2Long = requestData.Editsp.Goal1A2Long
		requestGoal1.Goal1A2Responsible = requestData.Editsp.Goal1A2Responsible
		requestGoal1.Goal1A2Startdate = requestData.Editsp.Goal1A2Startdate
		requestGoal1.Goal1A2Targetdate = requestData.Editsp.Goal1A2Targetdate
		requestGoal1.Goal1B = requestData.Editsp.Goal1B
		requestGoal1.Goal1Btype = requestData.Editsp.Goal1Btype
		requestGoal1.Goal1Blong = requestData.Editsp.Goal1Blong
		requestGoal1.Goal1Bresponsible = requestData.Editsp.Goal1Bresponsible
		requestGoal1.Goal1Bstartdate = requestData.Editsp.Goal1Bstartdate
		requestGoal1.Goal1Btargetdate = requestData.Editsp.Goal1Btargetdate
		requestGoal1.Goal1C = requestData.Editsp.Goal1C
		requestGoal1.Goal1Ctype = requestData.Editsp.Goal1Ctype
		requestGoal1.Goal1Clong = requestData.Editsp.Goal1Clong
		requestGoal1.Goal1Cresponsible = requestData.Editsp.Goal1Cresponsible
		requestGoal1.Goal1Cstartdate = requestData.Editsp.Goal1Cstartdate
		requestGoal1.Goal1Ctargetdate = requestData.Editsp.Goal1Ctargetdate
		requestGoal1.Goal1D = requestData.Editsp.Goal1D
		requestGoal1.Goal1Dtype = requestData.Editsp.Goal1Dtype
		requestGoal1.Goal1Dlong = requestData.Editsp.Goal1Dlong
		requestGoal1.Goal1Dresponsible = requestData.Editsp.Goal1Dresponsible
		requestGoal1.Goal1Dstartdate = requestData.Editsp.Goal1Dstartdate
		requestGoal1.Goal1Dtargetdate = requestData.Editsp.Goal1Dtargetdate
		requestGoal1.Goal1E = requestData.Editsp.Goal1E
		requestGoal1.Goal1Etype = requestData.Editsp.Goal1Etype
		requestGoal1.Goal1Elong = requestData.Editsp.Goal1Elong
		requestGoal1.Goal1Eresponsible = requestData.Editsp.Goal1Eresponsible
		requestGoal1.Goal1Estartdate = requestData.Editsp.Goal1Estartdate
		requestGoal1.Goal1Etargetdate = requestData.Editsp.Goal1Etargetdate
		requestGoal1.Goal1F1 = requestData.Editsp.Goal1F1
		requestGoal1.Goal1F1Type = requestData.Editsp.Goal1F1Type
		requestGoal1.Goal1F1Long = requestData.Editsp.Goal1F1Long
		requestGoal1.Goal1F1Responsible = requestData.Editsp.Goal1F1Responsible
		requestGoal1.Goal1F1Startdate = requestData.Editsp.Goal1F1Startdate
		requestGoal1.Goal1F1Targetdate = requestData.Editsp.Goal1F1Targetdate
		requestGoal1.Goal1F2 = requestData.Editsp.Goal1F2
		requestGoal1.Goal1F2Type = requestData.Editsp.Goal1F2Type
		requestGoal1.Goal1F2Text = requestData.Editsp.Goal1F2Text
		requestGoal1.Goal1F2Long = requestData.Editsp.Goal1F2Long
		requestGoal1.Goal1F2Responsible = requestData.Editsp.Goal1F2Responsible
		requestGoal1.Goal1F2Startdate = requestData.Editsp.Goal1F2Startdate
		requestGoal1.Goal1F2Targetdate = requestData.Editsp.Goal1F2Targetdate

		db.Save(&requestGoal1)
		if db.Error != nil {
			return false
		}
		var requestGoal2 models.SpGoal2
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal2).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}
		requestGoal2.Goal2A1 = requestData.Editsp.Goal2A1
		requestGoal2.Goal2A1Type = requestData.Editsp.Goal2A1Type
		requestGoal2.Goal2A1Long = requestData.Editsp.Goal2A1Long
		requestGoal2.Goal2A1Responsible = requestData.Editsp.Goal2A1Responsible
		requestGoal2.Goal2A1Startdate = requestData.Editsp.Goal2A1Startdate
		requestGoal2.Goal2A1Targetdate = requestData.Editsp.Goal2A1Targetdate
		requestGoal2.Goal2A2 = requestData.Editsp.Goal2A2
		requestGoal2.Goal2A2Type = requestData.Editsp.Goal2A2Type
		requestGoal2.Goal2A2Text = requestData.Editsp.Goal2A2Text
		requestGoal2.Goal2A2Long = requestData.Editsp.Goal2A2Long
		requestGoal2.Goal2A2Responsible = requestData.Editsp.Goal2A2Responsible
		requestGoal2.Goal2A2Startdate = requestData.Editsp.Goal2A2Startdate
		requestGoal2.Goal2A2Targetdate = requestData.Editsp.Goal2A2Targetdate
		requestGoal2.Goal2B = requestData.Editsp.Goal2B
		requestGoal2.Goal2Btype = requestData.Editsp.Goal2Btype
		requestGoal2.Goal2Blong = requestData.Editsp.Goal2Blong
		requestGoal2.Goal2Bresponsible = requestData.Editsp.Goal2Bresponsible
		requestGoal2.Goal2Bstartdate = requestData.Editsp.Goal2Bstartdate
		requestGoal2.Goal2Btargetdate = requestData.Editsp.Goal2Btargetdate
		requestGoal2.Goal2C = requestData.Editsp.Goal2C
		requestGoal2.Goal2Ctype = requestData.Editsp.Goal2Ctype
		requestGoal2.Goal2Clong = requestData.Editsp.Goal2Clong
		requestGoal2.Goal2Cresponsible = requestData.Editsp.Goal2Cresponsible
		requestGoal2.Goal2Cstartdate = requestData.Editsp.Goal2Cstartdate
		requestGoal2.Goal2Ctargetdate = requestData.Editsp.Goal2Ctargetdate
		requestGoal2.Goal2D1 = requestData.Editsp.Goal2D1
		requestGoal2.Goal2D1Type = requestData.Editsp.Goal2D1Type
		requestGoal2.Goal2D1Long = requestData.Editsp.Goal2D1Long
		requestGoal2.Goal2D1Responsible = requestData.Editsp.Goal2D1Responsible
		requestGoal2.Goal2D1Startdate = requestData.Editsp.Goal2D1Startdate
		requestGoal2.Goal2D1Targetdate = requestData.Editsp.Goal2D1Targetdate
		requestGoal2.Goal2D2 = requestData.Editsp.Goal2D2
		requestGoal2.Goal2D2Type = requestData.Editsp.Goal2D2Type
		requestGoal2.Goal2D2Text = requestData.Editsp.Goal2D2Text
		requestGoal2.Goal2D2Long = requestData.Editsp.Goal2D2Long
		requestGoal2.Goal2D2Responsible = requestData.Editsp.Goal2D2Responsible
		requestGoal2.Goal2D2Startdate = requestData.Editsp.Goal2D2Startdate
		requestGoal2.Goal2D2Targetdate = requestData.Editsp.Goal2D2Targetdate
		requestGoal2.Goal2D3 = requestData.Editsp.Goal2D3
		requestGoal2.Goal2D3Type = requestData.Editsp.Goal2D3Type
		requestGoal2.Goal2D3Text = requestData.Editsp.Goal2D3Text
		requestGoal2.Goal2D3Long = requestData.Editsp.Goal2D3Long
		requestGoal2.Goal2D3Responsible = requestData.Editsp.Goal2D3Responsible
		requestGoal2.Goal2D3Startdate = requestData.Editsp.Goal2D3Startdate
		requestGoal2.Goal2D3Targetdate = requestData.Editsp.Goal2D3Targetdate
		requestGoal2.Goal2D4 = requestData.Editsp.Goal2D4
		requestGoal2.Goal2D4Type = requestData.Editsp.Goal2D4Type
		requestGoal2.Goal2D4Text = requestData.Editsp.Goal2D4Text
		requestGoal2.Goal2D4Long = requestData.Editsp.Goal2D4Long
		requestGoal2.Goal2D4Responsible = requestData.Editsp.Goal2D4Responsible
		requestGoal2.Goal2D4Startdate = requestData.Editsp.Goal2D4Startdate
		requestGoal2.Goal2D4Targetdate = requestData.Editsp.Goal2D4Targetdate
		requestGoal2.Goal2D5 = requestData.Editsp.Goal2D5
		requestGoal2.Goal2D5Type = requestData.Editsp.Goal2D5Type
		requestGoal2.Goal2D5Text = requestData.Editsp.Goal2D5Text
		requestGoal2.Goal2D5Long = requestData.Editsp.Goal2D5Long
		requestGoal2.Goal2D5Responsible = requestData.Editsp.Goal2D5Responsible
		requestGoal2.Goal2D5Startdate = requestData.Editsp.Goal2D5Startdate
		requestGoal2.Goal2D5Targetdate = requestData.Editsp.Goal2D5Targetdate
		requestGoal2.Goal2D6 = requestData.Editsp.Goal2D6
		requestGoal2.Goal2D6Type = requestData.Editsp.Goal2D6Type
		requestGoal2.Goal2D6Text = requestData.Editsp.Goal2D6Text
		requestGoal2.Goal2D6Long = requestData.Editsp.Goal2D6Long
		requestGoal2.Goal2D6Responsible = requestData.Editsp.Goal2D6Responsible
		requestGoal2.Goal2D6Startdate = requestData.Editsp.Goal2D6Startdate
		requestGoal2.Goal2D6Targetdate = requestData.Editsp.Goal2D6Targetdate
		requestGoal2.Goal2D7 = requestData.Editsp.Goal2D7
		requestGoal2.Goal2D7Type = requestData.Editsp.Goal2D7Type
		requestGoal2.Goal2D7Text = requestData.Editsp.Goal2D7Text
		requestGoal2.Goal2D7Long = requestData.Editsp.Goal2D7Long
		requestGoal2.Goal2D7Responsible = requestData.Editsp.Goal2D7Responsible
		requestGoal2.Goal2D7Startdate = requestData.Editsp.Goal2D7Startdate
		requestGoal2.Goal2D7Targetdate = requestData.Editsp.Goal2D7Targetdate
		requestGoal2.Goal2D8 = requestData.Editsp.Goal2D8
		requestGoal2.Goal2D8Type = requestData.Editsp.Goal2D8Type
		requestGoal2.Goal2D8Text = requestData.Editsp.Goal2D8Text
		requestGoal2.Goal2D8Long = requestData.Editsp.Goal2D8Long
		requestGoal2.Goal2D8Responsible = requestData.Editsp.Goal2D8Responsible
		requestGoal2.Goal2D8Startdate = requestData.Editsp.Goal2D8Startdate
		requestGoal2.Goal2D8Targetdate = requestData.Editsp.Goal2D8Targetdate
		requestGoal2.Goal2D9 = requestData.Editsp.Goal2D9
		requestGoal2.Goal2D9Type = requestData.Editsp.Goal2D9Type
		requestGoal2.Goal2D9Text = requestData.Editsp.Goal2D9Text
		requestGoal2.Goal2D9Long = requestData.Editsp.Goal2D9Long
		requestGoal2.Goal2D9Responsible = requestData.Editsp.Goal2D9Responsible
		requestGoal2.Goal2D9Startdate = requestData.Editsp.Goal2D9Startdate
		requestGoal2.Goal2D9Targetdate = requestData.Editsp.Goal2D9Targetdate
		requestGoal2.Goal2D10 = requestData.Editsp.Goal2D10
		requestGoal2.Goal2D10Type = requestData.Editsp.Goal2D10Type
		requestGoal2.Goal2D10Text = requestData.Editsp.Goal2D10Text
		requestGoal2.Goal2D10Long = requestData.Editsp.Goal2D10Long
		requestGoal2.Goal2D10Responsible = requestData.Editsp.Goal2D10Responsible
		requestGoal2.Goal2D10Startdate = requestData.Editsp.Goal2D10Startdate
		requestGoal2.Goal2D10Targetdate = requestData.Editsp.Goal2D10Targetdate
		requestGoal2.Goal2D11 = requestData.Editsp.Goal2D11
		requestGoal2.Goal2D11Type = requestData.Editsp.Goal2D11Type
		requestGoal2.Goal2D11Text = requestData.Editsp.Goal2D11Text
		requestGoal2.Goal2D11Long = requestData.Editsp.Goal2D11Long
		requestGoal2.Goal2D11Responsible = requestData.Editsp.Goal2D11Responsible
		requestGoal2.Goal2D11Startdate = requestData.Editsp.Goal2D11Startdate
		requestGoal2.Goal2D11Targetdate = requestData.Editsp.Goal2D11Targetdate
		requestGoal2.Goal2D12 = requestData.Editsp.Goal2D12
		requestGoal2.Goal2D12Type = requestData.Editsp.Goal2D12Type
		requestGoal2.Goal2D12Text = requestData.Editsp.Goal2D12Text
		requestGoal2.Goal2D12Long = requestData.Editsp.Goal2D12Long
		requestGoal2.Goal2D12Responsible = requestData.Editsp.Goal2D12Responsible
		requestGoal2.Goal2D12Startdate = requestData.Editsp.Goal2D12Startdate
		requestGoal2.Goal2D12Targetdate = requestData.Editsp.Goal2D12Targetdate
		requestGoal2.Goal2D13 = requestData.Editsp.Goal2D13
		requestGoal2.Goal2D13Type = requestData.Editsp.Goal2D13Type
		requestGoal2.Goal2D13Text = requestData.Editsp.Goal2D13Text
		requestGoal2.Goal2D13Long = requestData.Editsp.Goal2D13Long
		requestGoal2.Goal2D13Responsible = requestData.Editsp.Goal2D13Responsible
		requestGoal2.Goal2D13Startdate = requestData.Editsp.Goal2D13Startdate
		requestGoal2.Goal2D13Targetdate = requestData.Editsp.Goal2D13Targetdate
		requestGoal2.Goal2E1 = requestData.Editsp.Goal2E1
		requestGoal2.Goal2E1Type = requestData.Editsp.Goal2E1Type
		requestGoal2.Goal2E1Long = requestData.Editsp.Goal2E1Long
		requestGoal2.Goal2E1Responsible = requestData.Editsp.Goal2E1Responsible
		requestGoal2.Goal2E1Startdate = requestData.Editsp.Goal2E1Startdate
		requestGoal2.Goal2E1Targetdate = requestData.Editsp.Goal2E1Targetdate
		requestGoal2.Goal2E2 = requestData.Editsp.Goal2E2
		requestGoal2.Goal2E2Type = requestData.Editsp.Goal2E2Type
		requestGoal2.Goal2E2Long = requestData.Editsp.Goal2E2Long
		requestGoal2.Goal2E2Responsible = requestData.Editsp.Goal2E2Responsible
		requestGoal2.Goal2E2Startdate = requestData.Editsp.Goal2E2Startdate
		requestGoal2.Goal2E2Targetdate = requestData.Editsp.Goal2E2Targetdate
		requestGoal2.Goal2E3 = requestData.Editsp.Goal2E3
		requestGoal2.Goal2E3Type = requestData.Editsp.Goal2E3Type
		requestGoal2.Goal2E3Long = requestData.Editsp.Goal2E3Long
		requestGoal2.Goal2E3Responsible = requestData.Editsp.Goal2E3Responsible
		requestGoal2.Goal2E3Startdate = requestData.Editsp.Goal2E3Startdate
		requestGoal2.Goal2E3Targetdate = requestData.Editsp.Goal2E3Targetdate
		requestGoal2.Goal2E4 = requestData.Editsp.Goal2E4
		requestGoal2.Goal2E4Type = requestData.Editsp.Goal2E4Type
		requestGoal2.Goal2E4Long = requestData.Editsp.Goal2E4Long
		requestGoal2.Goal2E4Responsible = requestData.Editsp.Goal2E4Responsible
		requestGoal2.Goal2E4Startdate = requestData.Editsp.Goal2E4Startdate
		requestGoal2.Goal2E4Targetdate = requestData.Editsp.Goal2E4Targetdate
		requestGoal2.Goal2E5 = requestData.Editsp.Goal2E5
		requestGoal2.Goal2E5Type = requestData.Editsp.Goal2E5Type
		requestGoal2.Goal2E5Text = requestData.Editsp.Goal2E5Text
		requestGoal2.Goal2E5Long = requestData.Editsp.Goal2E5Long
		requestGoal2.Goal2E5Responsible = requestData.Editsp.Goal2E5Responsible
		requestGoal2.Goal2E5Startdate = requestData.Editsp.Goal2E5Startdate
		requestGoal2.Goal2E5Targetdate = requestData.Editsp.Goal2E5Targetdate

		db.Save(&requestGoal2)
		if db.Error != nil {
			return false
		}
		var requestGoal3 models.SpGoal3
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal3).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		requestGoal3.Goal3A = requestData.Editsp.Goal3A
		requestGoal3.Goal3Atype = requestData.Editsp.Goal3Atype
		requestGoal3.Goal3Along = requestData.Editsp.Goal3Along
		requestGoal3.Goal3Aresponsible = requestData.Editsp.Goal3Aresponsible
		requestGoal3.Goal3Astartdate = requestData.Editsp.Goal3Astartdate
		requestGoal3.Goal3Atargetdate = requestData.Editsp.Goal3Atargetdate
		requestGoal3.Goal3A1 = requestData.Editsp.Goal3A1
		requestGoal3.Goal3A1Type = requestData.Editsp.Goal3A1Type
		requestGoal3.Goal3A1Long = requestData.Editsp.Goal3A1Long
		requestGoal3.Goal3A1Responsible = requestData.Editsp.Goal3A1Responsible
		requestGoal3.Goal3A1Startdate = requestData.Editsp.Goal3A1Startdate
		requestGoal3.Goal3A1Targetdate = requestData.Editsp.Goal3A1Targetdate
		requestGoal3.Goal3A2 = requestData.Editsp.Goal3A2
		requestGoal3.Goal3A2Type = requestData.Editsp.Goal3A2Type
		requestGoal3.Goal3A2Long = requestData.Editsp.Goal3A2Long
		requestGoal3.Goal3A2Responsible = requestData.Editsp.Goal3A2Responsible
		requestGoal3.Goal3A2Startdate = requestData.Editsp.Goal3A2Startdate
		requestGoal3.Goal3A2Targetdate = requestData.Editsp.Goal3A2Targetdate
		requestGoal3.Goal3A3 = requestData.Editsp.Goal3A3
		requestGoal3.Goal3A3Type = requestData.Editsp.Goal3A3Type
		requestGoal3.Goal3A3Long = requestData.Editsp.Goal3A3Long
		requestGoal3.Goal3A3Responsible = requestData.Editsp.Goal3A3Responsible
		requestGoal3.Goal3A3Startdate = requestData.Editsp.Goal3A3Startdate
		requestGoal3.Goal3A3Targetdate = requestData.Editsp.Goal3A3Targetdate
		requestGoal3.Goal3A4 = requestData.Editsp.Goal3A4
		requestGoal3.Goal3A4Type = requestData.Editsp.Goal3A4Type
		requestGoal3.Goal3A4Long = requestData.Editsp.Goal3A4Long
		requestGoal3.Goal3A4Responsible = requestData.Editsp.Goal3A4Responsible
		requestGoal3.Goal3A4Startdate = requestData.Editsp.Goal3A4Startdate
		requestGoal3.Goal3A4Targetdate = requestData.Editsp.Goal3A4Targetdate
		requestGoal3.Goal3A5 = requestData.Editsp.Goal3A5
		requestGoal3.Goal3A5Type = requestData.Editsp.Goal3A5Type
		requestGoal3.Goal3A5Long = requestData.Editsp.Goal3A5Long
		requestGoal3.Goal3A5Responsible = requestData.Editsp.Goal3A5Responsible
		requestGoal3.Goal3A5Startdate = requestData.Editsp.Goal3A5Startdate
		requestGoal3.Goal3A5Targetdate = requestData.Editsp.Goal3A5Targetdate
		requestGoal3.Goal3A6 = requestData.Editsp.Goal3A6
		requestGoal3.Goal3A6Type = requestData.Editsp.Goal3A6Type
		requestGoal3.Goal3A6Long = requestData.Editsp.Goal3A6Long
		requestGoal3.Goal3A6Responsible = requestData.Editsp.Goal3A6Responsible
		requestGoal3.Goal3A6Startdate = requestData.Editsp.Goal3A6Startdate
		requestGoal3.Goal3A6Targetdate = requestData.Editsp.Goal3A6Targetdate
		requestGoal3.Goal3A7 = requestData.Editsp.Goal3A7
		requestGoal3.Goal3A7Type = requestData.Editsp.Goal3A7Type
		requestGoal3.Goal3A7Long = requestData.Editsp.Goal3A7Long
		requestGoal3.Goal3A7Responsible = requestData.Editsp.Goal3A7Responsible
		requestGoal3.Goal3A7Startdate = requestData.Editsp.Goal3A7Startdate
		requestGoal3.Goal3A7Targetdate = requestData.Editsp.Goal3A7Targetdate
		requestGoal3.Goal3A8 = requestData.Editsp.Goal3A8
		requestGoal3.Goal3A8Type = requestData.Editsp.Goal3A8Type
		requestGoal3.Goal3A8Text = requestData.Editsp.Goal3A8Text
		requestGoal3.Goal3A8Long = requestData.Editsp.Goal3A8Long
		requestGoal3.Goal3A8Responsible = requestData.Editsp.Goal3A8Responsible
		requestGoal3.Goal3A8Startdate = requestData.Editsp.Goal3A8Startdate
		requestGoal3.Goal3A8Targetdate = requestData.Editsp.Goal3A8Targetdate
		requestGoal3.Goal3B1 = requestData.Editsp.Goal3B1
		requestGoal3.Goal3B1Type = requestData.Editsp.Goal3B1Type
		requestGoal3.Goal3B1Long = requestData.Editsp.Goal3B1Long
		requestGoal3.Goal3B1Responsible = requestData.Editsp.Goal3B1Responsible
		requestGoal3.Goal3B1Startdate = requestData.Editsp.Goal3B1Startdate
		requestGoal3.Goal3B1Targetdate = requestData.Editsp.Goal3B1Targetdate
		requestGoal3.Goal3B2 = requestData.Editsp.Goal3B2
		requestGoal3.Goal3B2Type = requestData.Editsp.Goal3B2Type
		requestGoal3.Goal3B2Long = requestData.Editsp.Goal3B2Long
		requestGoal3.Goal3B2Responsible = requestData.Editsp.Goal3B2Responsible
		requestGoal3.Goal3B2Startdate = requestData.Editsp.Goal3B2Startdate
		requestGoal3.Goal3B2Targetdate = requestData.Editsp.Goal3B2Targetdate
		requestGoal3.Goal3B3 = requestData.Editsp.Goal3B3
		requestGoal3.Goal3B3Type = requestData.Editsp.Goal3B3Type
		requestGoal3.Goal3B3Long = requestData.Editsp.Goal3B3Long
		requestGoal3.Goal3B3Responsible = requestData.Editsp.Goal3B3Responsible
		requestGoal3.Goal3B3Startdate = requestData.Editsp.Goal3B3Startdate
		requestGoal3.Goal3B3Targetdate = requestData.Editsp.Goal3B3Targetdate
		requestGoal3.Goal3B4 = requestData.Editsp.Goal3B4
		requestGoal3.Goal3B4Type = requestData.Editsp.Goal3B4Type
		requestGoal3.Goal3B4Long = requestData.Editsp.Goal3B4Long
		requestGoal3.Goal3B4Responsible = requestData.Editsp.Goal3B4Responsible
		requestGoal3.Goal3B4Startdate = requestData.Editsp.Goal3B4Startdate
		requestGoal3.Goal3B4Targetdate = requestData.Editsp.Goal3B4Targetdate
		requestGoal3.Goal3B5 = requestData.Editsp.Goal3B5
		requestGoal3.Goal3B5Type = requestData.Editsp.Goal3B5Type
		requestGoal3.Goal3B5Long = requestData.Editsp.Goal3B5Long
		requestGoal3.Goal3B5Responsible = requestData.Editsp.Goal3B5Responsible
		requestGoal3.Goal3B5Startdate = requestData.Editsp.Goal3B5Startdate
		requestGoal3.Goal3B5Targetdate = requestData.Editsp.Goal3B5Targetdate
		// requestGoal3.Goal3B6 = requestData.Editsp.Goal3B6
		// requestGoal3.Goal3B6Type = requestData.Editsp.Goal3B6Type
		// requestGoal3.Goal3B6Long = requestData.Editsp.Goal3B6Long
		// requestGoal3.Goal3B6Responsible = requestData.Editsp.Goal3B6Responsible
		// requestGoal3.Goal3B6Startdate = requestData.Editsp.Goal3B6Startdate
		// requestGoal3.Goal3B6Targetdate = requestData.Editsp.Goal3B6Targetdate
		// requestGoal3.Goal3B7 = requestData.Editsp.Goal3B7
		// requestGoal3.Goal3B7Type = requestData.Editsp.Goal3B7Type
		// requestGoal3.Goal3B7Long = requestData.Editsp.Goal3B7Long
		// requestGoal3.Goal3B7Responsible = requestData.Editsp.Goal3B7Responsible
		// requestGoal3.Goal3B7Startdate = requestData.Editsp.Goal3B7Startdate
		// requestGoal3.Goal3B7Targetdate = requestData.Editsp.Goal3B7Targetdate
		// requestGoal3.Goal3B8 = requestData.Editsp.Goal3B8
		// requestGoal3.Goal3B8Type = requestData.Editsp.Goal3B8Type
		// requestGoal3.Goal3B8Long = requestData.Editsp.Goal3B8Long
		// requestGoal3.Goal3B8Responsible = requestData.Editsp.Goal3B8Responsible
		// requestGoal3.Goal3B8Startdate = requestData.Editsp.Goal3B8Startdate
		// requestGoal3.Goal3B8Targetdate = requestData.Editsp.Goal3B8Targetdate
		requestGoal3.Goal3C1 = requestData.Editsp.Goal3C1
		requestGoal3.Goal3C1Type = requestData.Editsp.Goal3C1Type
		requestGoal3.Goal3C1Long = requestData.Editsp.Goal3C1Long
		requestGoal3.Goal3C1Responsible = requestData.Editsp.Goal3C1Responsible
		requestGoal3.Goal3C1Startdate = requestData.Editsp.Goal3C1Startdate
		requestGoal3.Goal3C1Targetdate = requestData.Editsp.Goal3C1Targetdate
		requestGoal3.Goal3C2 = requestData.Editsp.Goal3C2
		requestGoal3.Goal3C2Type = requestData.Editsp.Goal3C2Type
		requestGoal3.Goal3C2Long = requestData.Editsp.Goal3C2Long
		requestGoal3.Goal3C2Responsible = requestData.Editsp.Goal3C2Responsible
		requestGoal3.Goal3C2Startdate = requestData.Editsp.Goal3C2Startdate
		requestGoal3.Goal3C2Targetdate = requestData.Editsp.Goal3C2Targetdate
		requestGoal3.Goal3C3 = requestData.Editsp.Goal3C3
		requestGoal3.Goal3C3Type = requestData.Editsp.Goal3C3Type
		requestGoal3.Goal3C3Long = requestData.Editsp.Goal3C3Long
		requestGoal3.Goal3C3Responsible = requestData.Editsp.Goal3C3Responsible
		requestGoal3.Goal3C3Startdate = requestData.Editsp.Goal3C3Startdate
		requestGoal3.Goal3C3Targetdate = requestData.Editsp.Goal3C3Targetdate
		requestGoal3.Goal3C4 = requestData.Editsp.Goal3C4
		requestGoal3.Goal3C4Type = requestData.Editsp.Goal3C4Type
		requestGoal3.Goal3C4Long = requestData.Editsp.Goal3C4Long
		requestGoal3.Goal3C4Responsible = requestData.Editsp.Goal3C4Responsible
		requestGoal3.Goal3C4Startdate = requestData.Editsp.Goal3C4Startdate
		requestGoal3.Goal3C4Targetdate = requestData.Editsp.Goal3C4Targetdate
		requestGoal3.Goal3C5 = requestData.Editsp.Goal3C5
		requestGoal3.Goal3C5Type = requestData.Editsp.Goal3C5Type
		requestGoal3.Goal3C5Long = requestData.Editsp.Goal3C5Long
		requestGoal3.Goal3C5Responsible = requestData.Editsp.Goal3C5Responsible
		requestGoal3.Goal3C5Startdate = requestData.Editsp.Goal3C5Startdate
		requestGoal3.Goal3C5Targetdate = requestData.Editsp.Goal3C5Targetdate
		requestGoal3.Goal3C6 = requestData.Editsp.Goal3C6
		requestGoal3.Goal3C6Type = requestData.Editsp.Goal3C6Type
		requestGoal3.Goal3C6Long = requestData.Editsp.Goal3C6Long
		requestGoal3.Goal3C6Responsible = requestData.Editsp.Goal3C6Responsible
		requestGoal3.Goal3C6Startdate = requestData.Editsp.Goal3C6Startdate
		requestGoal3.Goal3C6Targetdate = requestData.Editsp.Goal3C6Targetdate
		requestGoal3.Goal3D1 = requestData.Editsp.Goal3D1
		requestGoal3.Goal3D1Type = requestData.Editsp.Goal3D1Type
		requestGoal3.Goal3D1Long = requestData.Editsp.Goal3D1Long
		requestGoal3.Goal3D1Responsible = requestData.Editsp.Goal3D1Responsible
		requestGoal3.Goal3D1Startdate = requestData.Editsp.Goal3D1Startdate
		requestGoal3.Goal3D1Targetdate = requestData.Editsp.Goal3D1Targetdate
		requestGoal3.Goal3D2 = requestData.Editsp.Goal3D2
		requestGoal3.Goal3D2Type = requestData.Editsp.Goal3D2Type
		requestGoal3.Goal3D2Long = requestData.Editsp.Goal3D2Long
		requestGoal3.Goal3D2Responsible = requestData.Editsp.Goal3D2Responsible
		requestGoal3.Goal3D2Startdate = requestData.Editsp.Goal3D2Startdate
		requestGoal3.Goal3D2Targetdate = requestData.Editsp.Goal3D2Targetdate
		requestGoal3.Goal3D3 = requestData.Editsp.Goal3D3
		requestGoal3.Goal3D3Type = requestData.Editsp.Goal3D3Type
		requestGoal3.Goal3D3Long = requestData.Editsp.Goal3D3Long
		requestGoal3.Goal3D3Responsible = requestData.Editsp.Goal3D3Responsible
		requestGoal3.Goal3D3Startdate = requestData.Editsp.Goal3D3Startdate
		requestGoal3.Goal3D3Targetdate = requestData.Editsp.Goal3D3Targetdate
		requestGoal3.Goal3D4 = requestData.Editsp.Goal3D4
		requestGoal3.Goal3D4Type = requestData.Editsp.Goal3D4Type
		requestGoal3.Goal3D4Long = requestData.Editsp.Goal3D4Long
		requestGoal3.Goal3D4Responsible = requestData.Editsp.Goal3D4Responsible
		requestGoal3.Goal3D4Startdate = requestData.Editsp.Goal3D4Startdate
		requestGoal3.Goal3D4Targetdate = requestData.Editsp.Goal3D4Targetdate
		requestGoal3.Goal3D5 = requestData.Editsp.Goal3D5
		requestGoal3.Goal3D5Type = requestData.Editsp.Goal3D5Type
		requestGoal3.Goal3D5Long = requestData.Editsp.Goal3D5Long
		requestGoal3.Goal3D5Responsible = requestData.Editsp.Goal3D5Responsible
		requestGoal3.Goal3D5Startdate = requestData.Editsp.Goal3D5Startdate
		requestGoal3.Goal3D5Targetdate = requestData.Editsp.Goal3D5Targetdate
		requestGoal3.Goal3D6 = requestData.Editsp.Goal3D6
		requestGoal3.Goal3D6Type = requestData.Editsp.Goal3D6Type
		requestGoal3.Goal3D6Long = requestData.Editsp.Goal3D6Long
		requestGoal3.Goal3D6Responsible = requestData.Editsp.Goal3D6Responsible
		requestGoal3.Goal3D6Startdate = requestData.Editsp.Goal3D6Startdate
		requestGoal3.Goal3D6Targetdate = requestData.Editsp.Goal3D6Targetdate
		requestGoal3.Goal3D7 = requestData.Editsp.Goal3D7
		requestGoal3.Goal3D7Type = requestData.Editsp.Goal3D7Type
		requestGoal3.Goal3D7Text = requestData.Editsp.Goal3D7Text
		requestGoal3.Goal3D7Long = requestData.Editsp.Goal3D7Long
		requestGoal3.Goal3D7Responsible = requestData.Editsp.Goal3D7Responsible
		requestGoal3.Goal3D7Startdate = requestData.Editsp.Goal3D7Startdate
		requestGoal3.Goal3D7Targetdate = requestData.Editsp.Goal3D7Targetdate
		requestGoal3.Goal3E = requestData.Editsp.Goal3E
		requestGoal3.Goal3Etype = requestData.Editsp.Goal3Etype
		requestGoal3.Goal3Elong = requestData.Editsp.Goal3Elong
		requestGoal3.Goal3Eresponsible = requestData.Editsp.Goal3Eresponsible
		requestGoal3.Goal3Estartdate = requestData.Editsp.Goal3Estartdate
		requestGoal3.Goal3Etargetdate = requestData.Editsp.Goal3Etargetdate
		requestGoal3.Goal3F = requestData.Editsp.Goal3F
		requestGoal3.Goal3FType = requestData.Editsp.Goal3FType
		requestGoal3.Goal3FLong = requestData.Editsp.Goal3FLong
		requestGoal3.Goal3FResponsible = requestData.Editsp.Goal3FResponsible
		requestGoal3.Goal3FStartdate = requestData.Editsp.Goal3FStartdate
		requestGoal3.Goal3FTargetdate = requestData.Editsp.Goal3FTargetdate

		db.Save(&requestGoal3)
		if db.Error != nil {
			return false
		}
		var requestGoal4 models.SpGoal4
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal4).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		requestGoal4.Goal4A = requestData.Editsp.Goal4A
		requestGoal4.Goal4Atype = requestData.Editsp.Goal4Atype
		requestGoal4.Goal4Along = requestData.Editsp.Goal4Along
		requestGoal4.Goal4Aresponsible = requestData.Editsp.Goal4Aresponsible
		requestGoal4.Goal4Astartdate = requestData.Editsp.Goal4Astartdate
		requestGoal4.Goal4Atargetdate = requestData.Editsp.Goal4Atargetdate
		requestGoal4.Goal4B = requestData.Editsp.Goal4B
		requestGoal4.Goal4Btype = requestData.Editsp.Goal4Btype
		requestGoal4.Goal4Blong = requestData.Editsp.Goal4Blong
		requestGoal4.Goal4Bresponsible = requestData.Editsp.Goal4Bresponsible
		requestGoal4.Goal4Bstartdate = requestData.Editsp.Goal4Bstartdate
		requestGoal4.Goal4Btargetdate = requestData.Editsp.Goal4Btargetdate
		requestGoal4.Goal4C = requestData.Editsp.Goal4C
		requestGoal4.Goal4Ctype = requestData.Editsp.Goal4Ctype
		requestGoal4.Goal4Clong = requestData.Editsp.Goal4Clong
		requestGoal4.Goal4Cresponsible = requestData.Editsp.Goal4Cresponsible
		requestGoal4.Goal4Cstartdate = requestData.Editsp.Goal4Cstartdate
		requestGoal4.Goal4Ctargetdate = requestData.Editsp.Goal4Ctargetdate
		requestGoal4.Goal4D = requestData.Editsp.Goal4D
		requestGoal4.Goal4Dtype = requestData.Editsp.Goal4Dtype
		requestGoal4.Goal4Dlong = requestData.Editsp.Goal4Dlong
		requestGoal4.Goal4Dresponsible = requestData.Editsp.Goal4Dresponsible
		requestGoal4.Goal4Dstartdate = requestData.Editsp.Goal4Dstartdate
		requestGoal4.Goal4Dtargetdate = requestData.Editsp.Goal4Dtargetdate
		requestGoal4.Goal4E = requestData.Editsp.Goal4E
		requestGoal4.Goal4Etype = requestData.Editsp.Goal4Etype
		requestGoal4.Goal4Elong = requestData.Editsp.Goal4Elong
		requestGoal4.Goal4Eresponsible = requestData.Editsp.Goal4Eresponsible
		requestGoal4.Goal4Estartdate = requestData.Editsp.Goal4Estartdate
		requestGoal4.Goal4Etargetdate = requestData.Editsp.Goal4Etargetdate
		requestGoal4.Goal4F = requestData.Editsp.Goal4F
		requestGoal4.Goal4Ftype = requestData.Editsp.Goal4Ftype
		requestGoal4.Goal4Flong = requestData.Editsp.Goal4Flong
		requestGoal4.Goal4Fresponsible = requestData.Editsp.Goal4Fresponsible
		requestGoal4.Goal4Fstartdate = requestData.Editsp.Goal4Fstartdate
		requestGoal4.Goal4Ftargetdate = requestData.Editsp.Goal4Ftargetdate

		db.Save(&requestGoal4)
		if db.Error != nil {
			return false
		}
		var requestGoal5 models.SpGoal5
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal5).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		requestGoal5.Goal5A = requestData.Editsp.Goal5A
		requestGoal5.Goal5Atype = requestData.Editsp.Goal5Atype
		requestGoal5.Goal5Along = requestData.Editsp.Goal5Along
		requestGoal5.Goal5Aresponsible = requestData.Editsp.Goal5Aresponsible
		requestGoal5.Goal5Astartdate = requestData.Editsp.Goal5Astartdate
		requestGoal5.Goal5Atargetdate = requestData.Editsp.Goal5Atargetdate
		requestGoal5.Goal5B = requestData.Editsp.Goal5B
		requestGoal5.Goal5Btype = requestData.Editsp.Goal5Btype
		requestGoal5.Goal5Blong = requestData.Editsp.Goal5Blong
		requestGoal5.Goal5Bresponsible = requestData.Editsp.Goal5Bresponsible
		requestGoal5.Goal5Bstartdate = requestData.Editsp.Goal5Bstartdate
		requestGoal5.Goal5Btargetdate = requestData.Editsp.Goal5Btargetdate
		requestGoal5.Goal5C = requestData.Editsp.Goal5C
		requestGoal5.Goal5Ctype = requestData.Editsp.Goal5Ctype
		requestGoal5.Goal5Clong = requestData.Editsp.Goal5Clong
		requestGoal5.Goal5Cresponsible = requestData.Editsp.Goal5Cresponsible
		requestGoal5.Goal5Cstartdate = requestData.Editsp.Goal5Cstartdate
		requestGoal5.Goal5Ctargetdate = requestData.Editsp.Goal5Ctargetdate
		requestGoal5.Goal5D = requestData.Editsp.Goal5D
		requestGoal5.Goal5Dtype = requestData.Editsp.Goal5Dtype
		requestGoal5.Goal5Dlong = requestData.Editsp.Goal5Dlong
		requestGoal5.Goal5Dresponsible = requestData.Editsp.Goal5Dresponsible
		requestGoal5.Goal5Dstartdate = requestData.Editsp.Goal5Dstartdate
		requestGoal5.Goal5Dtargetdate = requestData.Editsp.Goal5Dtargetdate
		requestGoal5.Goal5E = requestData.Editsp.Goal5E
		requestGoal5.Goal5Etype = requestData.Editsp.Goal5Etype
		requestGoal5.Goal5Elong = requestData.Editsp.Goal5Elong
		requestGoal5.Goal5Eresponsible = requestData.Editsp.Goal5Eresponsible
		requestGoal5.Goal5Estartdate = requestData.Editsp.Goal5Estartdate
		requestGoal5.Goal5Etargetdate = requestData.Editsp.Goal5Etargetdate

		db.Save(&requestGoal5)
		if db.Error != nil {
			return false
		}
		var requestGoal6 models.SpGoal6
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal6).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		requestGoal6.Goal6A1 = requestData.Editsp.Goal6A1
		requestGoal6.Goal6A1Type = requestData.Editsp.Goal6A1Type
		requestGoal6.Goal6A1Long = requestData.Editsp.Goal6A1Long
		requestGoal6.Goal6A1Responsible = requestData.Editsp.Goal6A1Responsible
		requestGoal6.Goal6A1Startdate = requestData.Editsp.Goal6A1Startdate
		requestGoal6.Goal6A1Targetdate = requestData.Editsp.Goal6A1Targetdate
		requestGoal6.Goal6A2 = requestData.Editsp.Goal6A2
		requestGoal6.Goal6A2Type = requestData.Editsp.Goal6A2Type
		requestGoal6.Goal6A2Long = requestData.Editsp.Goal6A2Long
		requestGoal6.Goal6A2Responsible = requestData.Editsp.Goal6A2Responsible
		requestGoal6.Goal6A2Startdate = requestData.Editsp.Goal6A2Startdate
		requestGoal6.Goal6A2Targetdate = requestData.Editsp.Goal6A2Targetdate
		requestGoal6.Goal6A3 = requestData.Editsp.Goal6A3
		requestGoal6.Goal6A3Type = requestData.Editsp.Goal6A3Type
		requestGoal6.Goal6A3Long = requestData.Editsp.Goal6A3Long
		requestGoal6.Goal6A3Responsible = requestData.Editsp.Goal6A3Responsible
		requestGoal6.Goal6A3Startdate = requestData.Editsp.Goal6A3Startdate
		requestGoal6.Goal6A3Targetdate = requestData.Editsp.Goal6A3Targetdate
		requestGoal6.Goal6A4 = requestData.Editsp.Goal6A4
		requestGoal6.Goal6A4Type = requestData.Editsp.Goal6A4Type
		requestGoal6.Goal6A4Long = requestData.Editsp.Goal6A4Long
		requestGoal6.Goal6A4Responsible = requestData.Editsp.Goal6A4Responsible
		requestGoal6.Goal6A4Startdate = requestData.Editsp.Goal6A4Startdate
		requestGoal6.Goal6A4Targetdate = requestData.Editsp.Goal6A4Targetdate
		requestGoal6.Goal6A5 = requestData.Editsp.Goal6A5
		requestGoal6.Goal6A5Type = requestData.Editsp.Goal6A5Type
		requestGoal6.Goal6A5Long = requestData.Editsp.Goal6A5Long
		requestGoal6.Goal6A5Responsible = requestData.Editsp.Goal6A5Responsible
		requestGoal6.Goal6A5Startdate = requestData.Editsp.Goal6A5Startdate
		requestGoal6.Goal6A5Targetdate = requestData.Editsp.Goal6A5Targetdate
		requestGoal6.Goal6B = requestData.Editsp.Goal6B
		requestGoal6.Goal6Btype = requestData.Editsp.Goal6Btype
		requestGoal6.Goal6Blong = requestData.Editsp.Goal6Blong
		requestGoal6.Goal6Bresponsible = requestData.Editsp.Goal6Bresponsible
		requestGoal6.Goal6Bstartdate = requestData.Editsp.Goal6Bstartdate
		requestGoal6.Goal6Btargetdate = requestData.Editsp.Goal6Btargetdate
		requestGoal6.Goal6C = requestData.Editsp.Goal6C
		requestGoal6.Goal6Ctype = requestData.Editsp.Goal6Ctype
		requestGoal6.Goal6Clong = requestData.Editsp.Goal6Clong
		requestGoal6.Goal6Cresponsible = requestData.Editsp.Goal6Cresponsible
		requestGoal6.Goal6Cstartdate = requestData.Editsp.Goal6Cstartdate
		requestGoal6.Goal6Ctargetdate = requestData.Editsp.Goal6Ctargetdate
		requestGoal6.Goal6D = requestData.Editsp.Goal6D
		requestGoal6.Goal6Dtype = requestData.Editsp.Goal6Dtype
		requestGoal6.Goal6Dlong = requestData.Editsp.Goal6Dlong
		requestGoal6.Goal6Dresponsible = requestData.Editsp.Goal6Dresponsible
		requestGoal6.Goal6Dstartdate = requestData.Editsp.Goal6Dstartdate
		requestGoal6.Goal6Dtargetdate = requestData.Editsp.Goal6Dtargetdate
		requestGoal6.Goal6E = requestData.Editsp.Goal6E
		requestGoal6.Goal6Etype = requestData.Editsp.Goal6Etype
		requestGoal6.Goal6Elong = requestData.Editsp.Goal6Elong
		requestGoal6.Goal6Eresponsible = requestData.Editsp.Goal6Eresponsible
		requestGoal6.Goal6Estartdate = requestData.Editsp.Goal6Estartdate
		requestGoal6.Goal6Etargetdate = requestData.Editsp.Goal6Etargetdate
		requestGoal6.Goal6F = requestData.Editsp.Goal6F
		requestGoal6.Goal6Ftype = requestData.Editsp.Goal6Ftype
		requestGoal6.Goal6Flong = requestData.Editsp.Goal6Flong
		requestGoal6.Goal6Fresponsible = requestData.Editsp.Goal6Fresponsible
		requestGoal6.Goal6Fstartdate = requestData.Editsp.Goal6Fstartdate
		requestGoal6.Goal6Ftargetdate = requestData.Editsp.Goal6Ftargetdate

		db.Save(&requestGoal6)
		if db.Error != nil {
			return false
		}
		var requestGoal7 models.SpGoal7
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal7).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}

		requestGoal7.Goal7A = requestData.Editsp.Goal7A
		requestGoal7.Goal7Atype = requestData.Editsp.Goal7Atype
		requestGoal7.Goal7Along = requestData.Editsp.Goal7Along
		requestGoal7.Goal7Aresponsible = requestData.Editsp.Goal7Aresponsible
		requestGoal7.Goal7Astartdate = requestData.Editsp.Goal7Astartdate
		requestGoal7.Goal7Atargetdate = requestData.Editsp.Goal7Atargetdate
		requestGoal7.Goal7B1 = requestData.Editsp.Goal7B1
		requestGoal7.Goal7B1Type = requestData.Editsp.Goal7B1Type
		requestGoal7.Goal7B1Long = requestData.Editsp.Goal7B1Long
		requestGoal7.Goal7B1Responsible = requestData.Editsp.Goal7B1Responsible
		requestGoal7.Goal7B1Startdate = requestData.Editsp.Goal7B1Startdate
		requestGoal7.Goal7B1Targetdate = requestData.Editsp.Goal7B1Targetdate
		requestGoal7.Goal7B2 = requestData.Editsp.Goal7B2
		requestGoal7.Goal7B2Type = requestData.Editsp.Goal7B2Type
		requestGoal7.Goal7B2Long = requestData.Editsp.Goal7B2Long
		requestGoal7.Goal7B2Responsible = requestData.Editsp.Goal7B2Responsible
		requestGoal7.Goal7B2Startdate = requestData.Editsp.Goal7B2Startdate
		requestGoal7.Goal7B2Targetdate = requestData.Editsp.Goal7B2Targetdate
		requestGoal7.Goal7B3 = requestData.Editsp.Goal7B3
		requestGoal7.Goal7B3Type = requestData.Editsp.Goal7B3Type
		requestGoal7.Goal7B3Long = requestData.Editsp.Goal7B3Long
		requestGoal7.Goal7B3Responsible = requestData.Editsp.Goal7B3Responsible
		requestGoal7.Goal7B3Startdate = requestData.Editsp.Goal7B3Startdate
		requestGoal7.Goal7B3Targetdate = requestData.Editsp.Goal7B3Targetdate
		requestGoal7.Goal7B4 = requestData.Editsp.Goal7B4
		requestGoal7.Goal7B4Type = requestData.Editsp.Goal7B4Type
		requestGoal7.Goal7B4Long = requestData.Editsp.Goal7B4Long
		requestGoal7.Goal7B4Responsible = requestData.Editsp.Goal7B4Responsible
		requestGoal7.Goal7B4Startdate = requestData.Editsp.Goal7B4Startdate
		requestGoal7.Goal7B4Targetdate = requestData.Editsp.Goal7B4Targetdate
		requestGoal7.Goal7C = requestData.Editsp.Goal7C
		requestGoal7.Goal7Ctype = requestData.Editsp.Goal7Ctype
		requestGoal7.Goal7Clong = requestData.Editsp.Goal7Clong
		requestGoal7.Goal7Cresponsible = requestData.Editsp.Goal7Cresponsible
		requestGoal7.Goal7Cstartdate = requestData.Editsp.Goal7Cstartdate
		requestGoal7.Goal7Ctargetdate = requestData.Editsp.Goal7Ctargetdate
		requestGoal7.Goal7D = requestData.Editsp.Goal7D
		requestGoal7.Goal7Dtype = requestData.Editsp.Goal7Dtype
		requestGoal7.Goal7Dlong = requestData.Editsp.Goal7Dlong
		requestGoal7.Goal7Dresponsible = requestData.Editsp.Goal7Dresponsible
		requestGoal7.Goal7Dstartdate = requestData.Editsp.Goal7Dstartdate
		requestGoal7.Goal7Dtargetdate = requestData.Editsp.Goal7Dtargetdate
		requestGoal7.Goal7E1 = requestData.Editsp.Goal7E1
		requestGoal7.Goal7E1Type = requestData.Editsp.Goal7E1Type
		requestGoal7.Goal7E1Long = requestData.Editsp.Goal7E1Long
		requestGoal7.Goal7E1Responsible = requestData.Editsp.Goal7E1Responsible
		requestGoal7.Goal7E1Startdate = requestData.Editsp.Goal7E1Startdate
		requestGoal7.Goal7E1Targetdate = requestData.Editsp.Goal7E1Targetdate
		requestGoal7.Goal7E2 = requestData.Editsp.Goal7E2
		requestGoal7.Goal7E2Type = requestData.Editsp.Goal7E2Type
		requestGoal7.Goal7E2Long = requestData.Editsp.Goal7E2Long
		requestGoal7.Goal7E2Responsible = requestData.Editsp.Goal7E2Responsible
		requestGoal7.Goal7E2Startdate = requestData.Editsp.Goal7E2Startdate
		requestGoal7.Goal7E2Targetdate = requestData.Editsp.Goal7E2Targetdate
		requestGoal7.Goal7E3 = requestData.Editsp.Goal7E3
		requestGoal7.Goal7E3Type = requestData.Editsp.Goal7E3Type
		requestGoal7.Goal7E3Long = requestData.Editsp.Goal7E3Long
		requestGoal7.Goal7E3Responsible = requestData.Editsp.Goal7E3Responsible
		requestGoal7.Goal7E3Startdate = requestData.Editsp.Goal7E3Startdate
		requestGoal7.Goal7E3Targetdate = requestData.Editsp.Goal7E3Targetdate
		requestGoal7.Goal7E4 = requestData.Editsp.Goal7E4
		requestGoal7.Goal7E4Type = requestData.Editsp.Goal7E4Type
		requestGoal7.Goal7E4Long = requestData.Editsp.Goal7E4Long
		requestGoal7.Goal7E4Responsible = requestData.Editsp.Goal7E4Responsible
		requestGoal7.Goal7E4Startdate = requestData.Editsp.Goal7E4Startdate
		requestGoal7.Goal7E4Targetdate = requestData.Editsp.Goal7E4Targetdate
		requestGoal7.Goal7E5 = requestData.Editsp.Goal7E5
		requestGoal7.Goal7E5Type = requestData.Editsp.Goal7E5Type
		requestGoal7.Goal7E5Long = requestData.Editsp.Goal7E5Long
		requestGoal7.Goal7E5Responsible = requestData.Editsp.Goal7E5Responsible
		requestGoal7.Goal7E5Startdate = requestData.Editsp.Goal7E5Startdate
		requestGoal7.Goal7E5Targetdate = requestData.Editsp.Goal7E5Targetdate
		requestGoal7.Goal7E6 = requestData.Editsp.Goal7E6
		requestGoal7.Goal7E6Type = requestData.Editsp.Goal7E6Type
		requestGoal7.Goal7E6Long = requestData.Editsp.Goal7E6Long
		requestGoal7.Goal7E6Responsible = requestData.Editsp.Goal7E6Responsible
		requestGoal7.Goal7E6Startdate = requestData.Editsp.Goal7E6Startdate
		requestGoal7.Goal7E6Targetdate = requestData.Editsp.Goal7E6Targetdate
		requestGoal7.Goal7E7 = requestData.Editsp.Goal7E7
		requestGoal7.Goal7E7Type = requestData.Editsp.Goal7E7Type
		requestGoal7.Goal7E7Text = requestData.Editsp.Goal7E7Text
		requestGoal7.Goal7E7Long = requestData.Editsp.Goal7E7Long
		requestGoal7.Goal7E7Responsible = requestData.Editsp.Goal7E7Responsible
		requestGoal7.Goal7E7Startdate = requestData.Editsp.Goal7E7Startdate
		requestGoal7.Goal7E7Targetdate = requestData.Editsp.Goal7E7Targetdate

		db.Save(&requestGoal7)
		if db.Error != nil {
			return false
		}
		var requestGoal8 models.SpGoal8
		// Buscar la entrada existente por ID
		if err := db.Where("sp = ?", request.ID).First(&requestGoal8).Error; err != nil {
			// Manejar el caso en el que no se encuentra la entrada
			return false
		}
		requestGoal8.Goal8A = requestData.Editsp.Goal8A
		requestGoal8.Goal8Atype = requestData.Editsp.Goal8Atype
		requestGoal8.Goal8Along = requestData.Editsp.Goal8Along
		requestGoal8.Goal8Aresponsible = requestData.Editsp.Goal8Aresponsible
		requestGoal8.Goal8Astartdate = requestData.Editsp.Goal8Astartdate
		requestGoal8.Goal8Atargetdate = requestData.Editsp.Goal8Atargetdate
		requestGoal8.Goal8B = requestData.Editsp.Goal8B
		requestGoal8.Goal8Btype = requestData.Editsp.Goal8Btype
		requestGoal8.Goal8Blong = requestData.Editsp.Goal8Blong
		requestGoal8.Goal8Bresponsible = requestData.Editsp.Goal8Bresponsible
		requestGoal8.Goal8Bstartdate = requestData.Editsp.Goal8Bstartdate
		requestGoal8.Goal8Btargetdate = requestData.Editsp.Goal8Btargetdate
		requestGoal8.Goal8C = requestData.Editsp.Goal8C
		requestGoal8.Goal8Ctype = requestData.Editsp.Goal8Ctype
		requestGoal8.Goal8Clong = requestData.Editsp.Goal8Clong
		requestGoal8.Goal8Cresponsible = requestData.Editsp.Goal8Cresponsible
		requestGoal8.Goal8Cstartdate = requestData.Editsp.Goal8Cstartdate
		requestGoal8.Goal8Ctargetdate = requestData.Editsp.Goal8Ctargetdate
		requestGoal8.Goal8D = requestData.Editsp.Goal8D
		requestGoal8.Goal8Dtype = requestData.Editsp.Goal8Dtype
		requestGoal8.Goal8Dlong = requestData.Editsp.Goal8Dlong
		requestGoal8.Goal8Dresponsible = requestData.Editsp.Goal8Dresponsible
		requestGoal8.Goal8Dstartdate = requestData.Editsp.Goal8Dstartdate
		requestGoal8.Goal8Dtargetdate = requestData.Editsp.Goal8Dtargetdate
		requestGoal8.Goal8E = requestData.Editsp.Goal8E
		requestGoal8.Goal8Etype = requestData.Editsp.Goal8Etype
		requestGoal8.Goal8Etext = requestData.Editsp.Goal8Etext
		requestGoal8.Goal8Elong = requestData.Editsp.Goal8Elong
		requestGoal8.Goal8Eresponsible = requestData.Editsp.Goal8Eresponsible
		requestGoal8.Goal8Estartdate = requestData.Editsp.Goal8Estartdate

		db.Save(&requestGoal8)
		if db.Error != nil {
			return false
		}

		var scm models.ClientServiceCaseManagement
		db.Where("ID = ?", request.Scm).Find(&scm)
		// system.Log <- models.Logs{
		// 	App:         "sunissup",
		// 	Action:      "UPDATE_SCM_SP",
		// 	LoggedIn:    claims["Email"].(string),
		// 	Username:    claims["Email"].(string),
		// 	Client:      int(scm.Client),
		// 	Description: "Information saved correctly",
		// }
		return true
	})

	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Client updated correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// QA|TCMS -- New Client ------------------------------------------------------
func AvailableMr(c *fiber.Ctx) error {
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {

		mr := c.Params("mr")

		var client models.Clients
		db.Where("mr = ?", mr).First(&client)

		if client.ID > 0 {
			return false
		} else {
			return true
		}
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"available": result,
	})
}

func ProposeMr(c *fiber.Ctx) error {
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var clients []models.Clients
		db.Order("mr asc").Find(&clients)

		proposedMr := 1
		for _, client := range clients {
			if client.Mr != proposedMr {
				break
			}
			proposedMr++
		}

		return proposedMr
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"proposed_mr": result.(int),
	})
}

func ClientsNewClientePut(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	var requestData models.FormNewClient
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {

		tcm, _ := core.GetUserFromLDAP(requestData.Newcasemanagement.Tcm)

		var recordTcm models.WorkerRecord
		db.Where("uid = ?", tcm.Uid).Find(&recordTcm)

		tcms, _ := core.GetUserFromLDAP(tcm.Supervisor)
		var recordTcms models.WorkerRecord
		db.Where("uid = ?", tcms.Uid).Find(&recordTcms)

		var client models.Clients
		if requestData.Newclient.ClientId == 0 {
			client.Mr = requestData.Newclient.Mr
			client.ReferringAgency = requestData.Newclient.ReferringAgency
			client.ReferringPerson = requestData.Newclient.ReferringPerson
			client.CellPhone = requestData.Newclient.CellPhone
			client.Fax = requestData.Newclient.Fax
			client.Email = requestData.Newclient.Email
			client.Date = requestData.Newclient.Date

			client.LastName = requestData.Newclient.LastName
			client.FirstName = requestData.Newclient.FirstName
			client.SS = requestData.Newclient.SS
			client.DOB = requestData.Newclient.Dob
			client.Sexo = requestData.Newclient.Sexo
			client.Race = requestData.Newclient.Race

			client.Address = requestData.Newclient.Address
			client.State = requestData.Newclient.State
			client.ZipCode = requestData.Newclient.ZipCode

			client.Phone = requestData.Newclient.Phone
			client.School = requestData.Newclient.School
			client.Lenguage = requestData.Newclient.Lenguage

			client.LegalGuardian = requestData.Newclient.LegalGuardian
			client.Relationship = requestData.Newclient.Relationship
			client.CellPhoneGuardian = requestData.Newclient.CellPhoneGuardian

			client.Medicaid = requestData.Newclient.Medicalid
			client.GoldCardNumber = requestData.Newclient.GoldCardNumber
			client.Medicare = requestData.Newclient.Medicare

			client.TcmActiveName = recordTcm.FullName

			db.Save(&client)
			if db.Error != nil {
				return false
			}
		}
		// Obtener el ID del cliente insertado

		clientID := requestData.Newclient.ClientId
		if requestData.Newclient.ClientId == 0 {
			clientID = int(client.ID)
		}

		if requestData.Newclient.CaseManagement && clientID != 0 {
			// Crear el registro de ClientServiceCaseManagement
			status := "Pending"

			// Create folder in Bucket
			core.ExtractFunctionsPlugins("s3", "CreateFolder", "clients/"+strconv.FormatUint(uint64(clientID), 10)+"/")
			// TODO Esto tiene que ir para el .env para que sea dinamico, por si ahi que agregar otro seguro
			// pendingPlanNames := []string{"Aetna Better Health", "Molina Healthcare", "Wellcare Health Plan", "Cigna"}

			// for _, planName := range pendingPlanNames {
			// 	if requestData.NewCMSure.PlanName == planName {
			// 		status = "Pending"
			// 		break // Sal del bucle tan pronto como se encuentre una coincidencia
			// 	}
			// }

			clientServiceCaseManagement := models.ClientServiceCaseManagement{
				Client: clientID,
				TCM:    int(tcm.ID), // Valor por defecto para TCM
				Doa:    requestData.Newcasemanagement.Doa,
				Status: status,
			}
			db.Save(&clientServiceCaseManagement)
			if db.Error != nil {
				return false
			} else {
				scmID := clientServiceCaseManagement.ID

				// Demografic----------------------
				clientSCMDemografic := models.ClientSCMDemografic{
					Client: clientID,
					Scm:    scmID,

					ReferringAgency: requestData.Newclient.ReferringAgency,
					ReferringPerson: requestData.Newclient.ReferringPerson,
					CellPhone:       requestData.Newclient.CellPhone,
					Fax:             requestData.Newclient.Fax,
					Email:           requestData.Newclient.Email,
					Date:            requestData.Newclient.Date,

					LastName:  requestData.Newclient.LastName,
					FirstName: requestData.Newclient.FirstName,
					SS:        requestData.Newclient.SS,
					DOB:       requestData.Newclient.Dob,
					Sexo:      requestData.Newclient.Sexo,
					Race:      requestData.Newclient.Race,

					Address: requestData.Newclient.Address,
					State:   requestData.Newclient.State,
					ZipCode: requestData.Newclient.ZipCode,

					Phone:    requestData.Newclient.CellPhone,
					School:   requestData.Newclient.School,
					Lenguage: requestData.Newclient.Lenguage,

					LegalGuardian:     requestData.Newclient.LegalGuardian,
					Relationship:      requestData.Newclient.Relationship,
					CellPhoneGuardian: requestData.Newclient.CellPhoneGuardian,

					Medicaid:       requestData.Newclient.Medicalid,
					GoldCardNumber: requestData.Newclient.GoldCardNumber,
					Medicare:       requestData.Newclient.Medicare,
				}
				db.Save(&clientSCMDemografic)
				// TCM-------------------------
				// var tcm models.WorkerRecord
				// db.Where("ID = ?", requestData.Newcasemanagement.Tcm).Find(&tcm)
				clientSCMTcm := models.ClienteSCMTcm{
					Client:      clientID,
					Scm:         scmID,
					FullName:    recordTcm.FullName,
					Categorytcm: tcm.Credentials,
					Signature:   tcm.Signature,
					Active:      tcm.Active,
				}
				db.Save(&clientSCMTcm)
				// Medical-------------------------
				clientSCMMedical := models.ClientSCMMedical{
					Client:            clientID,
					Scm:               scmID,
					MedicalPcp:        requestData.NewCMMedical.MedicalPcp,
					MedicalPcpAddress: requestData.NewCMMedical.MedicalPcpAddress,
					MedicalPcpPhone:   requestData.NewCMMedical.MedicalPcpPhone,

					MedicalPsychiatrisy:        requestData.NewCMMedical.MedicalPsychiatrisy,
					MedicalPsychiatrisyAddress: requestData.NewCMMedical.MedicalPsychiatrisyAddress,
					MedicalPsychiatrisyPhone:   requestData.NewCMMedical.MedicalPsychiatrisyPhone,
				}
				db.Save(&clientSCMMedical)
				// Mental--------------------------
				clientSCMMental := models.ClientSCMMental{
					Client:              clientID,
					Scm:                 scmID,
					MentalPrimary:       requestData.Newclient.MentalPrimary,
					MentalPrimaryDate:   requestData.Newclient.MentalPrimaryDate,
					MentalSecondary:     requestData.Newclient.MentalSecondary,
					MentalSecondaryDate: requestData.Newclient.MentalSecondaryDate,
				}
				db.Save(&clientSCMMental)
				// Certification---------------------
				clientCertification := models.ClientSCMCertification{
					Client: clientID,
					Scm:    scmID,
					// -- Dates TCM
					Tcm:         int(tcm.ID),
					Nametcm:     recordTcm.FullName,
					Categorytcm: tcm.Credentials,
					// Dates TCMS
					Supervisor:         int(tcms.ID),
					NameSupervisor:     recordTcms.FullName,
					Categorysupervisor: tcms.Credentials,
				}
				db.Save(&clientCertification)
				// Assessment------------------------
				clientAssessment := models.ClientSCMAssessment{
					Client: clientID,
					Scm:    scmID,
					// Dates TCM
					Tcm:         int(tcm.ID),
					Nametcm:     recordTcm.FullName,
					Categorytcm: tcm.Credentials,
					// Dates TCMS
					Supervisor:         int(tcms.ID),
					NameSupervisor:     recordTcms.FullName,
					CategorySupervisor: tcms.Credentials,
				}
				db.Save(&clientAssessment)
				// SP------------------------

				clientSp := models.ClientSCMSp{
					Client: clientID,
					Scm:    scmID,
					// Dates TCM
					Tcm:         int(tcm.ID),
					Nametcm:     recordTcm.FullName,
					Categorytcm: tcm.Credentials,
					// Dates TCMS
					Supervisor:         int(tcms.ID),
					NameSupervisor:     recordTcms.FullName,
					CategorySupervisor: tcms.Credentials,
				}
				db.Save(&clientSp)
				var sp models.ClientSCMSp
				db.Where("scm = ?", scmID).Find(&sp)
				// Goal1------------------------
				goal1 := models.SpGoal1{
					Sp: sp.ID,
				}
				db.Save(&goal1)
				// Goal2------------------------
				goal2 := models.SpGoal2{
					Sp: sp.ID,
				}
				db.Save(&goal2)
				// Goal3------------------------
				goal3 := models.SpGoal3{
					Sp: sp.ID,
				}
				db.Save(&goal3)
				// Goal4------------------------
				goal4 := models.SpGoal4{
					Sp: sp.ID,
				}
				db.Save(&goal4)
				// Goal5------------------------
				goal5 := models.SpGoal5{
					Sp: sp.ID,
				}
				db.Save(&goal5)
				// Goal6------------------------
				goal6 := models.SpGoal6{
					Sp: sp.ID,
				}
				db.Save(&goal6)
				// Goal7------------------------
				goal7 := models.SpGoal7{
					Sp: sp.ID,
				}
				db.Save(&goal7)
				// Goal8------------------------
				goal8 := models.SpGoal8{
					Sp: sp.ID,
				}
				db.Save(&goal8)
			}
		}
		var request models.RequestNewClient
		db.Where("ID = ?", requestData.Data.ID).Delete(&request)
		// TODO: Aqui ahi que agregar el log de la opercacion y crear una notificacion a los dos usuarios al TCM y al TCMS
		return true
	})
	if result.(bool) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Client created correctly",
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ClientsListAllGet(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var clients []models.OutClients

	var userIDs []int64

	// Adicionar le usuario que esta logueado si es TCMS
	if claims["Roll"].(string) == "TCMS" {
		userIDs = append(userIDs, int64(claims["ID"].(float64)))
	}
	// Buscar todos los tcm que tiene como supervisor al usuario logueado
	resultTCMS := core.ExtractFunctionsPlugins("ldap", "Search", "(&(supervisor="+claims["UID"].(string)+"))")
	bytes, _ := json.Marshal(&resultTCMS)
	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		for _, userLdap := range resultSearch.Entries {
			id, _ := strconv.ParseInt(userLdap.GetAttributeValue("id"), 10, 64)
			userIDs = append(userIDs, id)
		}
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var caseManagement []models.ClientServiceCaseManagement
		// With this query obtain only one scm from each tcm client
		db.Select("DISTINCT client").Find(&caseManagement)
		for _, val := range caseManagement {
			var client models.Clients
			db.Where("ID = ?", val.Client).Find(&client)

			var cms []models.ClientServiceCaseManagement
			db.Where("client = ?", client.ID).Find(&cms)

			var scm []models.OutClientSCM

			if claims["Roll"].(string) == "TCMS" {
				for _, cm := range cms {
					found := false
					for _, id := range userIDs {
						if id == int64(cm.TCM) {
							found = true
							break
						}
					}
					if found {
						scm = append(scm, models.OutClientSCM{
							ID:          int(cm.ID),
							Status:      cm.Status,
							Doa:         cm.Doa,
							ClosingDate: cm.ClosingDate,
							Tcm:         cm.TCM,
						})

					}
				}
				clients = append(clients, models.OutClients{
					ID:              client.ID,
					Mr:              client.Mr,
					ReferrerID:      client.ReferrerID,
					ReferringAgency: client.ReferringAgency,
					ReferringPerson: client.ReferringPerson,
					CellPhone:       client.CellPhone,
					Fax:             client.Fax,
					Email:           client.Email,
					Date:            client.Date,

					LastName:  client.LastName,
					FirstName: client.FirstName,
					SS:        client.SS,
					DOB:       client.DOB,
					Sexo:      client.Sexo,
					Race:      client.Race,

					Address: client.Address,
					State:   client.State,
					ZipCode: client.ZipCode,

					Phone:    client.Phone,
					School:   client.School,
					Lenguage: client.Lenguage,

					SingClient: client.SingClient,

					LegalGuardian:     client.LegalGuardian,
					Relationship:      client.Relationship,
					CellPhoneGuardian: client.CellPhoneGuardian,
					SingGuardian:      client.SingGuardian,

					Medicaid:         client.Medicaid,
					GoldCardNumber:   client.GoldCardNumber,
					Medicare:         client.Medicare,
					TcmTcmActiveName: client.TcmActiveName,
					Scm:              scm,
				})
			} else {
				for _, cm := range cms {
					scm = append(scm, models.OutClientSCM{
						ID:          int(cm.ID),
						Status:      cm.Status,
						Doa:         cm.Doa,
						ClosingDate: cm.ClosingDate,
						Tcm:         cm.TCM,
					})
				}

				clients = append(clients, models.OutClients{
					ID:              client.ID,
					Mr:              client.Mr,
					ReferrerID:      client.ReferrerID,
					ReferringAgency: client.ReferringAgency,
					ReferringPerson: client.ReferringPerson,
					CellPhone:       client.CellPhone,
					Fax:             client.Fax,
					Email:           client.Email,
					Date:            client.Date,

					LastName:  client.LastName,
					FirstName: client.FirstName,
					SS:        client.SS,
					DOB:       client.DOB,
					Sexo:      client.Sexo,
					Race:      client.Race,

					Address: client.Address,
					State:   client.State,
					ZipCode: client.ZipCode,

					Phone:    client.Phone,
					School:   client.School,
					Lenguage: client.Lenguage,

					SingClient: client.SingClient,

					LegalGuardian:     client.LegalGuardian,
					Relationship:      client.Relationship,
					CellPhoneGuardian: client.CellPhoneGuardian,
					SingGuardian:      client.SingGuardian,

					Medicaid:         client.Medicaid,
					GoldCardNumber:   client.GoldCardNumber,
					Medicare:         client.Medicare,
					TcmTcmActiveName: client.TcmActiveName,
					Scm:              scm,
				})
			}

		}

		return clients
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"clients": result.([]models.OutClients),
	})
}

func ClientGet(c *fiber.Ctx) error {
	id := c.Params("id")
	var clients models.Clients
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("ID = ?", id).Find(&clients)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"client": clients,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func ClientSCMGet(c *fiber.Ctx) error {
	id := c.Params("id")
	var scm models.OutClientSCMActive
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var caseManagement models.ClientServiceCaseManagement
		db.Where("ID = ?", id).Find(&caseManagement)

		var tcm models.ClienteSCMTcm
		db.Where("scm = ?", caseManagement.ID).Find(&tcm)
		var demografic models.ClientSCMDemografic
		db.Where("scm = ?", caseManagement.ID).Find(&demografic)
		// -----
		var sureActive models.ClientSCMSure
		db.Where("scm = ? and active = ?", caseManagement.ID, true).Find(&sureActive)

		var notes []models.Notes
		db.Where("scm = ? and insurance = ?", caseManagement.ID, sureActive.ID).Find(&notes)
		// --- Calculte notes available
		var consumedUnits int64
		for _, note := range notes {
			consumedUnits += int64(note.Units)
		}
		// ---

		var sures []models.ClientSCMSure
		db.Where("scm = ?", caseManagement.ID).Find(&sures)

		var files []models.ClientSCMSureFilesInCloud
		db.Where("scm = ?", caseManagement.ID).Find(&files)
		// -----

		var medicals models.ClientSCMMedical
		db.Where("scm = ?", caseManagement.ID).Find(&medicals)
		var mentals models.ClientSCMMental
		db.Where("scm = ?", caseManagement.ID).Find(&mentals)
		// Documents
		// -------------
		var certification models.ClientSCMCertification
		db.Where("scm = ?", caseManagement.ID).Find(&certification)

		var outCertification models.OutSCMCertification

		decryptedCertSignaturetcm, _ := core.DecryptImage(certification.Signtcm)
		decryptedCertSignaturesupervisor, _ := core.DecryptImage(certification.Signsupervisor)
		decryptedCertSignatureqa, _ := core.DecryptImage(certification.Signqa)

		copier.Copy(&outCertification, &certification)

		outCertification.Signtcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturetcm)
		outCertification.Signsupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignaturesupervisor)
		outCertification.Signqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedCertSignatureqa)

		// -----------

		var assessment models.ClientSCMAssessment
		db.Where("scm = ?", caseManagement.ID).Find(&assessment)
		var outAssessmet models.OutSCMAssessment
		decryptedAssessmentSignaturetcm, _ := core.DecryptImage(assessment.Signaturetcm)
		decryptedAssessmentSignaturesupervisor, _ := core.DecryptImage(assessment.Signaturesupervisor)
		decryptedAssessmentSignatureqa, _ := core.DecryptImage(assessment.Signatureqa)
		copier.Copy(&outAssessmet, &assessment)
		outAssessmet.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturetcm)
		outAssessmet.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignaturesupervisor)
		outAssessmet.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedAssessmentSignatureqa)

		var sp models.ClientSCMSp
		db.Where("scm = ?", caseManagement.ID).Find(&sp)

		var goal1 models.SpGoal1
		db.Where("sp = ?", sp.ID).Find(&goal1)
		var goal2 models.SpGoal2
		db.Where("sp = ?", sp.ID).Find(&goal2)
		var goal3 models.SpGoal3
		db.Where("sp = ?", sp.ID).Find(&goal3)
		var goal4 models.SpGoal4
		db.Where("sp = ?", sp.ID).Find(&goal4)
		var goal5 models.SpGoal5
		db.Where("sp = ?", sp.ID).Find(&goal5)
		var goal6 models.SpGoal6
		db.Where("sp = ?", sp.ID).Find(&goal6)
		var goal7 models.SpGoal7
		db.Where("sp = ?", sp.ID).Find(&goal7)
		var goal8 models.SpGoal8
		db.Where("sp = ?", sp.ID).Find(&goal8)

		var outSp models.OutClientSCMSp
		decryptedSignaturetcm, _ := core.DecryptImage(sp.Signaturetcm)
		decryptedSignaturesupervisor, _ := core.DecryptImage(sp.Signaturesupervisor)
		decryptedSignatureqa, _ := core.DecryptImage(sp.Signatureqa)

		outSp.ID = int(sp.ID)
		outSp.Client = sp.Client
		outSp.Scm = sp.Scm
		outSp.Developmentdate = sp.Developmentdate
		outSp.Axiscode = sp.Axiscode
		outSp.Axiscodedescription = sp.Axiscodedescription
		outSp.Tcm = sp.Tcm
		outSp.Goal1 = goal1
		outSp.Goal2 = goal2
		outSp.Goal3 = goal3
		outSp.Goal4 = goal4
		outSp.Goal5 = goal5
		outSp.Goal6 = goal6
		outSp.Goal7 = goal7
		outSp.Goal8 = goal8

		outSp.Nametcm = sp.Nametcm
		outSp.Categorytcm = sp.Categorytcm
		outSp.Signaturetcm = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturetcm)
		outSp.Signaturetcmdate = sp.Signaturetcmdate

		outSp.Supervisor = sp.Supervisor
		outSp.NameSupervisor = sp.NameSupervisor
		outSp.CategorySupervisor = sp.CategorySupervisor
		outSp.Signaturesupervisor = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignaturesupervisor)
		outSp.Signaturesupervisordate = sp.Signaturesupervisordate

		outSp.Qa = sp.Qa
		outSp.Signatureqa = "data:image/png;base64," + base64.StdEncoding.EncodeToString(decryptedSignatureqa)
		outSp.Signatureqadate = sp.Signatureqadate

		scm.ID = int(caseManagement.ID)
		scm.Status = caseManagement.Status
		scm.Doa = caseManagement.Doa
		scm.ClosingDate = caseManagement.ClosingDate
		scm.TcmID = caseManagement.TCM
		scm.TCM = tcm
		scm.Demografic = demografic
		scm.SureActive = sureActive
		scm.NotesSureActive = notes
		scm.UnitsConsumed = consumedUnits
		scm.Sure = sures
		scm.Files = files
		scm.Medical = medicals
		scm.Mental = mentals

		scm.Certification = outCertification
		scm.Assessment = outAssessmet
		scm.Sp = outSp

		return scm
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"scm": result.(models.OutClientSCMActive),
	})
}

func ClientGetServiceSCMactive(c *fiber.Ctx) error {
	id := c.Params("id")
	var clientsSCM models.ClientServiceCaseManagement
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("client = ?", id).Find(&clientsSCM)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"serviceCMactive": clientsSCM,
		})
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// Get all client of the TCM ---------------------------------------------
func TCMClients(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var clients []models.OutClients

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var caseManagement []models.ClientServiceCaseManagement
		// With this query obtain only one scm from each tcm client
		db.Select("DISTINCT client").Where("tcm = ?", claims["ID"].(float64)).Find(&caseManagement)

		for _, val := range caseManagement {
			var client models.Clients
			db.Where("ID = ?", val.Client).Find(&client)
			var cms []models.ClientServiceCaseManagement
			db.Where("client = ?", client.ID).Find(&cms)
			var scm []models.OutClientSCM
			for _, cm := range cms {
				scm = append(scm, models.OutClientSCM{
					ID:          int(cm.ID),
					Status:      cm.Status,
					Doa:         cm.Doa,
					ClosingDate: cm.ClosingDate,
					Tcm:         cm.TCM,
				})
			}

			clients = append(clients, models.OutClients{
				ID:              client.ID,
				Mr:              client.Mr,
				ReferrerID:      client.ReferrerID,
				ReferringAgency: client.ReferringAgency,
				ReferringPerson: client.ReferringPerson,
				CellPhone:       client.CellPhone,
				Fax:             client.Fax,
				Email:           client.Email,
				Date:            client.Date,

				LastName:  client.LastName,
				FirstName: client.FirstName,
				SS:        client.SS,
				DOB:       client.DOB,
				Sexo:      client.Sexo,
				Race:      client.Race,

				Address: client.Address,
				State:   client.State,
				ZipCode: client.ZipCode,

				Phone:    client.Phone,
				School:   client.School,
				Lenguage: client.Lenguage,

				SingClient: client.SingClient,

				LegalGuardian:     client.LegalGuardian,
				Relationship:      client.Relationship,
				CellPhoneGuardian: client.CellPhoneGuardian,
				SingGuardian:      client.SingGuardian,

				Medicaid:       client.Medicaid,
				GoldCardNumber: client.GoldCardNumber,
				Medicare:       client.Medicare,
				Scm:            scm,
			})
		}

		return clients
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"clients": result.([]models.OutClients),
	})
}

// Get all client of the TCM ---------------------------------------------
func TCMClientsActiveCsm(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var clients []models.OutClients

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var caseManagement []models.ClientServiceCaseManagement
		// With this query obtain only one scm from each tcm client
		db.Select("DISTINCT client").Where("tcm = ? and status = ?", claims["ID"].(float64), "Open").Find(&caseManagement)

		for _, val := range caseManagement {
			var client models.Clients
			db.Where("ID = ?", val.Client).Find(&client)
			var cms []models.ClientServiceCaseManagement
			db.Where("client = ?", client.ID).Find(&cms)
			var scm []models.OutClientSCM
			for _, cm := range cms {
				scm = append(scm, models.OutClientSCM{
					ID:          int(cm.ID),
					Status:      cm.Status,
					Doa:         cm.Doa,
					ClosingDate: cm.ClosingDate,
				})
			}

			clients = append(clients, models.OutClients{
				ID:              client.ID,
				Mr:              client.Mr,
				ReferrerID:      client.ReferrerID,
				ReferringAgency: client.ReferringAgency,
				ReferringPerson: client.ReferringPerson,
				CellPhone:       client.CellPhone,
				Fax:             client.Fax,
				Email:           client.Email,
				Date:            client.Date,

				LastName:  client.LastName,
				FirstName: client.FirstName,
				SS:        client.SS,
				DOB:       client.DOB,
				Sexo:      client.Sexo,
				Race:      client.Race,

				Address: client.Address,
				State:   client.State,
				ZipCode: client.ZipCode,

				Phone:    client.Phone,
				School:   client.School,
				Lenguage: client.Lenguage,

				SingClient: client.SingClient,

				LegalGuardian:     client.LegalGuardian,
				Relationship:      client.Relationship,
				CellPhoneGuardian: client.CellPhoneGuardian,
				SingGuardian:      client.SingGuardian,

				Medicaid:       client.Medicaid,
				GoldCardNumber: client.GoldCardNumber,
				Medicare:       client.Medicare,
				Scm:            scm,
			})
		}

		return clients
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"clients": result.([]models.OutClients),
	})
}
