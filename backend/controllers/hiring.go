package controllers

import (
	"io"
	"log"
	"mime/multipart"
	"os"
	"strconv"
	"strings"
	"sync"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func HiringPersonalInformationPut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormPersonalinformation
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var record models.WorkerRecord
		db.Where("id = ?", claims["RECORD"].(float64)).Find(&record)
		record.FullName = requestData.Personalinformation.Fullname
		record.Email = requestData.Personalinformation.Email
		record.Address = requestData.Personalinformation.Address
		record.City = requestData.Personalinformation.City
		record.State = requestData.Personalinformation.State
		record.ZipCode = requestData.Personalinformation.Zipcode
		record.County = requestData.Personalinformation.County
		record.HomePhone = requestData.Personalinformation.Homephone
		record.CellPhone = requestData.Personalinformation.Cellphone
		record.SocialSecurity = requestData.Personalinformation.SocialSecurity
		record.Dob = requestData.Personalinformation.Dob
		record.ApplicationDate = requestData.Personalinformation.ApplicationDate
		record.ApplyingAs = requestData.Personalinformation.ApplyingAs
		record.PositionApplied = requestData.Personalinformation.PositionApplied
		record.AvailableStartDate = requestData.Personalinformation.AvailableStartDate
		record.AvailableFor = requestData.Personalinformation.AvailableFor
		record.Question1 = requestData.Personalinformation.Question1
		record.Question2 = requestData.Personalinformation.Question2
		record.Question3 = requestData.Personalinformation.Question3
		record.Question4 = requestData.Personalinformation.Question4
		record.Question5 = requestData.Personalinformation.Question5
		record.Question6 = requestData.Personalinformation.Question6
		record.Question7 = requestData.Personalinformation.Question7
		record.Question8 = requestData.Personalinformation.Question8
		record.Question9 = requestData.Personalinformation.Question9
		record.DetailsQuestionsInYES = requestData.Personalinformation.DetailsQuestionsInYes
		record.Question10 = requestData.Personalinformation.Question10
		record.Question11 = requestData.Personalinformation.Question11
		record.Question12 = requestData.Personalinformation.Question12
		record.LanguageList = requestData.Personalinformation.LanguagesList
		record.SkillsList = requestData.Personalinformation.SpecialSkills
		return db.Save(&record)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_PERSONAL_INFORMATION",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func HiringEducationPut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormEducation
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		var education models.Educations
		db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&education)
		education.Institution = requestData.Education.Institution
		education.Course = requestData.Education.Course
		education.Started = requestData.Education.Started
		education.Completed = requestData.Education.Completed
		education.SecondInstitution = requestData.Education.SecondInstitution
		education.SecondCourse = requestData.Education.SecondCourse
		education.SecondStarted = requestData.Education.SecondStarted
		education.SecondCompleted = requestData.Education.SecondCompleted
		education.ThirdInstitution = requestData.Education.ThirdInstitution
		education.ThirdCourse = requestData.Education.ThirdCourse
		education.ThirdStarted = requestData.Education.ThirdStarted
		education.ThirdCompleted = requestData.Education.ThirdCompleted

		if education.WorkerRecordID != uint(claims["RECORD"].(float64)) {
			education.WorkerRecordID = uint(claims["RECORD"].(float64))
			return db.Create(&education)
		}
		return db.Save(&education)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_EMPLOYMENT_HISTORY",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func HiringEmploymentHistoryPut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormEmploymentHistory
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// var record models.WorkerRecord
		// db.Where("user_id = ?", claims["RECORD"].(float64)).Find(&record)
		var employmentHistoty models.EmploymentHistory
		db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&employmentHistoty)
		employmentHistoty.Employer = requestData.Employmenthistory.Employer
		employmentHistoty.Address = requestData.Employmenthistory.Address
		employmentHistoty.Supervisor = requestData.Employmenthistory.Supervisor
		employmentHistoty.Phone = requestData.Employmenthistory.Phone
		employmentHistoty.Period = requestData.Employmenthistory.Period
		employmentHistoty.Position = requestData.Employmenthistory.Position
		employmentHistoty.Reason = requestData.Employmenthistory.Reason
		employmentHistoty.SecondEmployer = requestData.Employmenthistory.SecondEmployer
		employmentHistoty.SecondAddress = requestData.Employmenthistory.SecondAddress
		employmentHistoty.SecondSupervisor = requestData.Employmenthistory.SecondSupervisor
		employmentHistoty.SecondPhone = requestData.Employmenthistory.SecondPhone
		employmentHistoty.SecondPeriod = requestData.Employmenthistory.SecondPeriod
		employmentHistoty.SecondPosition = requestData.Employmenthistory.SecondPosition
		employmentHistoty.SecondReason = requestData.Employmenthistory.SecondReason
		if employmentHistoty.WorkerRecordID != uint(claims["RECORD"].(float64)) {
			employmentHistoty.WorkerRecordID = uint(claims["RECORD"].(float64))
			return db.Create(&employmentHistoty)
		}
		return db.Save(&employmentHistoty)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_EMPLOYMENT_HISTORY",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func HiringPersonalReferencesPut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormPersonalreferences
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// var record models.WorkerRecord
		// db.Where("user_id = ?", claims["ID"].(float64)).Find(&record)
		var personalReferences models.PersonalReferences
		db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&personalReferences)

		personalReferences.Name = requestData.Personalreferences.Name
		personalReferences.Phone = requestData.Personalreferences.Phone
		personalReferences.Relationship = requestData.Personalreferences.Relationship
		personalReferences.SecondName = requestData.Personalreferences.SecondName
		personalReferences.SecondPhone = requestData.Personalreferences.SecondPhone
		personalReferences.SecondRelationship = requestData.Personalreferences.SecondRelationship

		if personalReferences.WorkerRecordID != uint(claims["RECORD"].(float64)) {
			personalReferences.WorkerRecordID = uint(claims["RECORD"].(float64))
			return db.Create(&personalReferences)
		}
		return db.Save(&personalReferences)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_PERSONAL_REFERENCES",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func HiringEmergencyMedicalPut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormEmergencyMedical
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// var record models.WorkerRecord
		// db.Where("user_id = ?", claims["ID"].(float64)).Find(&record)
		var emergencyMedical models.EmergencyMedical
		db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&emergencyMedical)

		emergencyMedical.Name = requestData.Emergencymedical.Name
		emergencyMedical.Relationship = requestData.Emergencymedical.Relationship
		emergencyMedical.HomePhone = requestData.Emergencymedical.HomePhone
		emergencyMedical.CellPhone = requestData.Emergencymedical.CellPhone
		emergencyMedical.Employer = requestData.Emergencymedical.Employer
		emergencyMedical.EmployerPhone = requestData.Emergencymedical.EmployerPhone
		emergencyMedical.KnownAllergies = requestData.Emergencymedical.KnownAllergies
		emergencyMedical.HealthCondition = requestData.Emergencymedical.HealthCondition
		emergencyMedical.Medications = requestData.Emergencymedical.Medications
		emergencyMedical.PhysiciansName = requestData.Emergencymedical.PhysiciansName
		emergencyMedical.PhysiciansPhone = requestData.Emergencymedical.PhysiciansPhone
		emergencyMedical.PreferredHospital = requestData.Emergencymedical.PreferredHospital
		emergencyMedical.MedicalInsurance = requestData.Emergencymedical.MedicalInsurance
		emergencyMedical.Policy = requestData.Emergencymedical.Policy

		if emergencyMedical.WorkerRecordID != uint(claims["RECORD"].(float64)) {
			emergencyMedical.WorkerRecordID = uint(claims["RECORD"].(float64))
			return db.Create(&emergencyMedical)
		}
		return db.Save(&emergencyMedical)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_EMERGENCY_MEDICAL",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

func HiringDirectDepositPut(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	var requestData models.FormDirectDeposit
	if err := c.BodyParser(&requestData); err != nil {
		return err
	}
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		// var record models.WorkerRecord
		// db.Where("user_id = ?", claims["ID"].(float64)).Find(&record)
		var directDeposit models.DirectDeposit
		db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&directDeposit)

		directDeposit.FinancialInstitution = requestData.Directdeposit.FinancialInstitution
		directDeposit.AccountNumber = requestData.Directdeposit.AccountNumber
		directDeposit.RoutingNumber = requestData.Directdeposit.RoutingNumber
		directDeposit.Options = requestData.Directdeposit.Options

		if directDeposit.WorkerRecordID != uint(claims["RECORD"].(float64)) {
			directDeposit.WorkerRecordID = uint(claims["RECORD"].(float64))
			return db.Create(&directDeposit)
		}
		return db.Save(&directDeposit)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "MODIFY_DIRECT_DEPOSIT",
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: "Information saved correctly",
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Information saved correctly",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"message": "Error",
	})
}

// Upload Files bucket s3
func HiringUploadFile(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	typeFile := c.Params("file")
	code := core.GetCode(typeFile)
	destination := "records/" + claims["UID"].(string) + "/"

	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error receiving files"})
	}

	files := form.File["archivo"]

	for _, file := range files {
		openfile, _ := file.Open()
		defer openfile.Close()
		key := destination + generateNewFileName(code, file)
		// Leer el contenido del archivo en un []byte
		fileBytes, _ := io.ReadAll(openfile)

		objects := core.ExtractFunctionsPlugins("s3", "UploadFileInByte", key, false, fileBytes)

		if objects.(bool) {
			result, _ := database.WithDB(func(db *gorm.DB) interface{} {

				var documents models.NecessaryDocuments
				db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&documents)

				core.UpdateDocuments(&documents, code)

				return db.Save(&documents)
			})

			if result.(*gorm.DB).RowsAffected > 0 {
				system.Log <- models.Logs{
					App:         "sunissup",
					Action:      "UPLOAD_" + code,
					LoggedIn:    claims["UID"].(string),
					Username:    claims["UID"].(string),
					Client:      0,
					Description: code + " uploaded successfully",
				}
			}

			return c.Status(fiber.StatusOK).JSON(fiber.Map{
				"message": code + " uploaded successfully",
			})
		}
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error"})

	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error"})
}

// Upload Files Local Dir
func HiringUploadFiles(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	typeFile := c.Params("file")

	code := core.GetCode(typeFile)

	stringValue := strconv.FormatFloat(claims["ID"].(float64), 'f', -1, 64)
	destination := "data/records/" + stringValue + "/"

	form, err := c.MultipartForm()
	if err != nil {
		return core.HandleError(c, "Error receiving files")
	}

	files := form.File["archivo"]
	var wg sync.WaitGroup
	for _, file := range files {
		wg.Add(1)
		go func(file *multipart.FileHeader) {
			defer wg.Done()

			src, err := file.Open()
			if err != nil {
				core.HandleError(c, "Error opening file")
				return
			}
			defer src.Close()

			err = os.MkdirAll(destination, os.ModePerm)
			if err != nil {
				core.HandleError(c, err.Error())
				return
			}

			dst, err := os.Create(destination + generateNewFileName(code, file))
			if err != nil {
				core.HandleError(c, "Error creating file")
				return
			}
			defer dst.Close()

			_, err = io.Copy(dst, src)
			if err != nil {
				core.HandleError(c, "Save file error")
				return
			}
		}(file)
	}

	wg.Wait()

	result, _ := database.WithDB(func(db *gorm.DB) interface{} {

		var documents models.NecessaryDocuments
		db.Where("worker_record_id = ?", claims["RECORD"].(float64)).Find(&documents)

		core.UpdateDocuments(&documents, code)

		return db.Save(&documents)
	})

	if result.(*gorm.DB).RowsAffected > 0 {
		system.Log <- models.Logs{
			App:         "sunissup",
			Action:      "UPLOAD_" + code,
			LoggedIn:    claims["UID"].(string),
			Username:    claims["UID"].(string),
			Client:      0,
			Description: code + " uploaded successfully",
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": code + " uploaded successfully",
	})
}

// TODO Adjust function so that any file from the worker's file can be downloaded
func HiringDownloadFilesS3(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	// Obtiene el parámetro adicional del destino desde la URL
	typeFile := c.Params("file")
	code := core.GetCode(typeFile)

	filePath := "records/" + claims["UID"].(string) + "/" + code + ".pdf"

	objectsUrl := core.ExtractFunctionsPlugins("s3", "PresignedURL", filePath, "5m")

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"url": objectsUrl.(string)})
}

// TODO Adjust function so that any file from the worker's file can be downloaded
func HiringDownloadFiles(c *fiber.Ctx) error {
	claims, _ := GetClaims(c)
	// Obtiene el parámetro adicional del destino desde la URL
	typeFile := c.Params("file")
	code := core.GetCode(typeFile)
	stringValue := strconv.FormatFloat(claims["ID"].(float64), 'f', -1, 64)
	filePath := "data/records/" + stringValue + "/" + code + ".pdf"

	// Leer el contenido del archivo
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Leer el contenido del archivo en un []byte
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	// Configurar la respuesta para el archivo PDF
	c.Response().Header.Set("Content-Type", "application/pdf")
	c.Response().Header.Set("Content-Disposition", "attachment; filename="+code+".pdf")

	// Enviar el contenido del archivo como respuesta
	return c.Send(fileBytes)
}

func HiringEmailDownloadFiles(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	// Obtiene el parámetro adicional del destino desde la URL
	typeFile := c.Params("file")
	id := c.Params("id")
	code := core.GetCode(typeFile)
	filePath := "data/records/" + id + "/" + code + ".pdf"

	// Leer el contenido del archivo
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Leer el contenido del archivo en un []byte
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	// Configurar la respuesta para el archivo PDF
	c.Response().Header.Set("Content-Type", "application/pdf")
	c.Response().Header.Set("Content-Disposition", "attachment; filename="+code+".pdf")

	// Enviar el contenido del archivo como respuesta
	return c.Send(fileBytes)
}

func generateNewFileName(code string, originalName *multipart.FileHeader) string {
	// Obtener la posición del último punto
	lastDotIndex := strings.LastIndex(originalName.Filename, ".")

	// Extraer el substring después del último punto
	extension := originalName.Filename[lastDotIndex+1:]

	return code + "." + extension
}
