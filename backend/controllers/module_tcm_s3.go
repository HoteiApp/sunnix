package controllers

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/go-ldap/ldap/v3"
	"github.com/gofiber/fiber/v2"
	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/model"
	"gorm.io/gorm"
)

func S3List(c *fiber.Ctx) error {
	objects := core.ExtractFunctionsPlugins("s3", "ListeFiles")
	// Devuelve la lista de objetos como JSON
	return c.JSON(objects.([]map[string]string))
}

// Subir los files de los expedientes de los trabajadores
func S3UploadFile(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	// typeFile := c.Params("file")
	form, _ := c.MultipartForm()
	for key, _ := range form.File {
		files := form.File[key]
		for _, file := range files {
			openfile, _ := file.Open()
			defer openfile.Close()

			// Leer el contenido del archivo en un []byte
			fileBytes, _ := io.ReadAll(openfile)
			keyName := strings.Replace(strings.Replace(key, "-", "/", -1), "%20", " ", -1)
			// fmt.Println(keyName)
			objects := core.ExtractFunctionsPlugins("s3", "UploadFileInByte", keyName+".pdf", false, fileBytes)

			if objects.(bool) {
				part := strings.Split(keyName, "/")
				if part[0] == "records" {
					result := core.ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+part[1]+"))")
					bytes, _ := json.Marshal(&result)
					var resultSearch ldap.SearchResult
					_ = json.Unmarshal(bytes, &resultSearch)

					if len(resultSearch.Entries) > 0 {
						userLdap := resultSearch.Entries[0]

						id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)

						var doc models.NecessaryDocuments
						// record/uid/document
						_, _ = database.WithDB(func(db *gorm.DB) interface{} {
							db.Where("worker_record_id = ?", id).Find(&doc)

							docMap := map[string]*bool{
								"resume":                       &doc.Resume,
								"diploma_transcripts":          &doc.DiplomaTranscripts,
								"licenses_certifications":      &doc.LicensesCertifications,
								"course_fcb":                   &doc.CourseFcb,
								"service_trainer_provider":     &doc.ServiceTrainerProvider,
								"service_cpr_aed":              &doc.ServiceCprAed,
								"service_osha":                 &doc.ServiceOSHA,
								"service_infection_control":    &doc.ServiceInfectionControl,
								"service_hiv_aids":             &doc.ServiceHivAids,
								"service_domestic_violence":    &doc.ServiceDomesticViolence,
								"service_hippa":                &doc.ServiceHIPPA,
								"service_security_awareness":   &doc.ServiceSecurityAwarenes,
								"service_access_civil_rights":  &doc.ServicAccessCivilRights,
								"service_deaf_hard":            &doc.ServiceDeafHard,
								"service_fars_cfars":           &doc.ServiceFarsCfars,
								"other_medicaid_certification": &doc.OtherMedicaidCertification,
								"other_medicaid_provider":      &doc.OtherMedicaidProvider,
								"other_drivers_license":        &doc.OtherDriversLicense,
								"other_social_security_card":   &doc.OtherSocialSecurityCard,
								"other_proof_legal_status":     &doc.OtherProofLegalStatus,
								"other_employee_id_badge":      &doc.OtherEmployeeIDBadge,
								"other_vehicle_registration":   &doc.OtherVehicleRegistration,
								"other_proof_insurance":        &doc.OtherProofInsurance,
								"form_i9":                      &doc.FormI9,
								"form_w9":                      &doc.Formw9,
								"form_w4":                      &doc.Formw4,
							}

							if field, exists := docMap[part[2]]; exists {
								*field = true
							}

							db.Save(&doc)
							return false
						})

					}
				}
				// Si el tipo de fichero que se desa subir es para un INSURANCE
				if part[3] == "insurance" {
					var file models.ClientSCMSureFilesInCloud
					_, _ = database.WithDB(func(db *gorm.DB) interface{} {
						db.Where("scm = ? and sure = ?", part[2], part[4]).First(&file)
						if part[5] == "Auth Request" {
							file.Auth = true
						}
						if part[5] == "Certification" {
							file.Certification = true
						}
						if part[5] == "Assessment" {
							file.Assessment = true
						}
						if part[5] == "Service Plan" {
							file.Sp = true
						}
						if part[5] == "Evaluation" {
							file.Evaluation = true
						}
						db.Save(&file)
						return true
					})
				}

				return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Upload ok"})
			}
		}
	}
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error"})
}

// Subir los ficheros de las auth
func S3Upload(c *fiber.Ctx) error {
	var req PDFRequestUpload
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	pdf := core.ExtractFunctionsPlugins("pdf", "CreatePDF", req.HTML, req.PageSize)

	// -- Modo de uso: system.ExtractFunctionsPlugins("s3","UploadFileInByte", "key", [true|false], "pathFile")
	objects := core.ExtractFunctionsPlugins("s3", "UploadFileInByte", req.Folder+req.Name+".pdf", false, pdf.([]byte))

	if objects.(bool) {

		// tcm/client/scm/insurance/id
		part := strings.Split(req.Folder, "/")

		// Si el tipo de fichero que se desa subir es para un INSURANCE
		if part[3] == "insurance" {
			var file models.ClientSCMSureFilesInCloud
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				db.Where("scm = ? and sure = ?", part[2], part[4]).First(&file)
				if req.Name == "Auth Request" {
					file.Auth = true
				}
				if req.Name == "Certification" {
					file.Certification = true
				}
				if req.Name == "Assessment" {
					file.Assessment = true
				}
				if req.Name == "Service Plan" {
					file.Sp = true
				}
				if req.Name == "Evaluation" {
					file.Evaluation = true
				}
				db.Save(&file)
				return true
			})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Upload file"})
	}
	// Devuelve la lista de objetos como JSON
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error to upload file"})
}

// Subir ficheros de las evaluaciones y las miscelaneus
func S3UploadEvalMisc(c *fiber.Ctx) error {
	var req PDFRequestUpload
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}
	// fmt.Println(req.Folder)
	// El foder debe de llegar con la estructura de (tcm/client/scm/[eval|misc]/)

	// pdf := core.ExtractFunctionsPlugins("pdf", "CreatePDF", req.HTML, req.PageSize)

	// -- Modo de uso: system.ExtractFunctionsPlugins("s3","UploadFileInByte", "key", [true|false], "pathFile")
	// objects := core.ExtractFunctionsPlugins("s3", "UploadFileInByte", req.Folder+req.Name+".pdf", false, pdf.([]byte))

	// if objects.(bool) {

	// var file models.ClientSCMSureFilesInCloud
	// tcm/client/scm/sure/
	// part := strings.Split(req.Folder, "/")
	// _, _ = database.WithDB(func(db *gorm.DB) interface{} {
	// 	db.Where("scm = ? and sure = ?", part[2], part[3]).First(&file)
	// 	if req.Name == "Auth Request" {
	// 		file.Auth = true
	// 	}
	// 	if req.Name == "Certification" {
	// 		file.Certification = true
	// 	}
	// 	if req.Name == "Assessment" {
	// 		file.Assessment = true
	// 	}
	// 	if req.Name == "Service Plan" {
	// 		file.Sp = true
	// 	}
	// 	if req.Name == "Evaluation" {
	// 		file.Evaluation = true
	// 	}
	// 	db.Save(&file)
	// 	return false
	// })
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Upload ok"})
	// }
	// Devuelve la lista de objetos como JSON
	// return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error"})
}

// Crear url para visualizar un fichero
func S3PresignedURL(c *fiber.Ctx) error {
	var req models.S3PresignedURL
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	objectsUrl := core.ExtractFunctionsPlugins("s3", "PresignedURL", req.Key, req.Duration)

	// if objectsUrl.(string) != "" {

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"url": objectsUrl.(string)})
	// }
	// Devuelve la lista de objetos como JSON
	// return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Error"})
}

func S3DeleteObj(c *fiber.Ctx) error {
	var obj models.S3DeleteObj
	if err := c.BodyParser(&obj); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	result := core.ExtractFunctionsPlugins("s3", "DeleteObjet", obj.Key)

	if result.(bool) {
		var file models.ClientSCMSureFilesInCloud
		// tcm/client/idscm/sure/
		part := strings.Split(obj.Key, "/")
		if part[3] == "insurance" {
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				db.Where("scm = ? and sure = ?", part[2], part[4]).First(&file)
				if obj.Name == "Auth Request" {
					file.Auth = false
				}
				if obj.Name == "Certification" {
					file.Certification = false
				}
				if obj.Name == "Assessment" {
					file.Assessment = false
				}
				if obj.Name == "Service Plan" {
					file.Sp = false
				}
				if obj.Name == "Evaluation" {
					file.Evaluation = false
				}
				db.Save(&file)
				return false
			})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Object deleted"})
	}
	// Devuelve la lista de objetos como JSON
	return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "Failed to delete object"})
}

func S3DownloadZip(c *fiber.Ctx) error {
	// Estructura para recibir los nombres de los archivos
	var request struct {
		FileNames []string `json:"fileNames"`
	}

	// Parsear el cuerpo de la solicitud
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Error al parsear la solicitud: " + err.Error())
	}

	// Validar que se hayan enviado nombres de archivos
	if len(request.FileNames) == 0 {
		return c.Status(fiber.StatusBadRequest).SendString("No se enviaron nombres de archivos")
	}

	// Crear un buffer para el archivo ZIP
	buf := new(bytes.Buffer)
	zipWriter := zip.NewWriter(buf)

	// Descargar y agregar cada archivo al archivo ZIP
	for _, fileName := range request.FileNames {
		// Supongamos que el método ExtractFunctionsPlugins devuelve el archivo en formato []byte
		object := core.ExtractFunctionsPlugins("s3", "DownloadFile", fileName, false)

		// Convertir el objeto []byte en un io.Reader
		objectReader := bytes.NewReader(object.([]byte))

		// Extraer solo el nombre del archivo
		_, file := path.Split(fileName)

		// Crear una entrada en el archivo ZIP sin las carpetas
		zipFile, err := zipWriter.Create(file)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al crear el archivo ZIP para %s: %v", file, err))
		}

		// Copiar el contenido del archivo al archivo ZIP
		if _, err := io.Copy(zipFile, objectReader); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al copiar el archivo %s al ZIP: %v", file, err))
		}
	}

	// Cerrar el archivo ZIP
	if err := zipWriter.Close(); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al cerrar el archivo ZIP: %v", err))
	}

	// Configurar la respuesta para enviar el archivo ZIP
	c.Set("Content-Type", "application/zip")
	c.Set("Content-Disposition", "attachment; filename=Authorization.zip")

	// Enviar el archivo ZIP en la respuesta
	return c.Send(buf.Bytes())
}

func S3DownloadPDF(c *fiber.Ctx) error {
	// Estructura para recibir los nombres de los archivos
	var request struct {
		FileNames []string `json:"fileNames"`
	}

	// Parsear el cuerpo de la solicitud
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Error al parsear la solicitud: " + err.Error())
	}

	// Validar que se hayan enviado nombres de archivos
	if len(request.FileNames) == 0 {
		return c.Status(fiber.StatusBadRequest).SendString("No se enviaron nombres de archivos")
	}

	// Crear una lista para almacenar los nombres de archivos temporales
	tempFiles := []string{}

	// Descargar cada archivo PDF y guardarlo temporalmente
	for _, fileName := range request.FileNames {
		// Descargar el archivo PDF como []byte desde S3
		object := core.ExtractFunctionsPlugins("s3", "DownloadFile", fileName, false)
		content := object.([]byte)

		// Crear un archivo temporal
		tempFile, err := os.CreateTemp(os.TempDir(), "pdf_*.pdf")
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al crear un archivo temporal: %v", err))
		}
		defer os.Remove(tempFile.Name()) // Asegurarse de eliminar el archivo temporal después de su uso

		// Escribir el contenido en el archivo temporal
		if _, err := tempFile.Write(content); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al escribir el archivo temporal: %v", err))
		}
		tempFiles = append(tempFiles, tempFile.Name())
	}

	// Configurar el archivo de salida
	outputFileName := filepath.Join(os.TempDir(), "merged.pdf")
	config := model.NewDefaultConfiguration()

	// Fusionar los archivos PDF temporales en uno solo
	if err := api.MergeCreateFile(tempFiles, outputFileName, false, config); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al fusionar archivos PDF: %v", err))
	}

	// Leer el archivo fusionado
	mergedContent, err := os.ReadFile(outputFileName)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error al leer el PDF fusionado: %v", err))
	}

	// Configurar la respuesta para enviar el archivo PDF
	c.Set("Content-Type", "application/pdf")
	c.Set("Content-Disposition", "attachment; filename=merged.pdf")
	// Enviar el archivo PDF en la respuesta
	return c.Send(mergedContent)
}

func S3GetDocs(c *fiber.Ctx) error {
	// claims, _ := GetClaims(c)
	// Obtener archivo de audio
	var req models.S3GetDocs
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	objectsUrl := core.ExtractFunctionsPlugins("s3", "ListeFilesInFolder", req.Path)

	var extractDocs []models.ExtractDocs
	num := 0
	for _, doc := range objectsUrl.([]map[string]string) {
		extractDocs = append(extractDocs, models.ExtractDocs{
			Key: doc["Key"],
			URL: doc["URL"],
		})
		num++
	}

	return c.Status(fiber.StatusOK).JSON(
		fiber.Map{
			"total": num,
			"urls":  extractDocs,
		},
	)
}
