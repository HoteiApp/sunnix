package controllers

import (
	"fmt"
	"io"

	"github.com/HoteiApp/sunnix/plugins/s3/core"
	"github.com/HoteiApp/sunnix/plugins/s3/system"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gofiber/fiber/v2"
)

func S3_List(c *fiber.Ctx) error {
	objects := core.ListeFiles()
	// Devuelve la lista de objetos como JSON
	return c.JSON(objects)
}

func S3_Upload(c *fiber.Ctx) error {
	// create an aws session
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(system.S3_REGION),
		Credentials: credentials.NewStaticCredentials(system.ACCESS_KEY, system.SECRET_KEY, ""),
	})
	if err != nil {
		panic(err)
	}

	// create an up loader
	pr, pw := io.Pipe()
	errch := make(chan error)
	go chunkUploader(sess, "sunissupFile2.txt", errch, pr)

	// retrieve the data from database
	chunk, skip := retrieveNextChunk(0, system.CHUNK_SIZE)

	for {
		if len(chunk) == 0 {
			break
		}

		// this uploads the chunk
		pw.Write(chunk)

		// this retrieves new data from "database" and saves the as a new chunk and new
		// skip value for the next retrieving
		chunk, skip = retrieveNextChunk(skip, system.CHUNK_SIZE)
	}

	// close the writter - this tells S3 to finish uploading your file which will
	// then appear in your bucket object list page
	pw.Close()

	// check for errors
	err = <-errch
	if err != nil {
		panic(err)
	}

	fmt.Println("Texto escrito correctamente en S3")
	return nil
}

func S3_UploadPDF(c *fiber.Ctx) error {
	// open the PDF file
	buffer := system.ReadFile("document.pdf")

	result := core.UploadFile("PDF/dd22.pdf", false, buffer)

	if result {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"Upload":  result,
			"message": "File saved in bucket",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"Upload":  result,
		"message": "Error saving file to bucket",
	})
}

// this is an example function for retrieving a part of data from your database
func retrieveNextChunk(skip int, limit int) ([]byte, int) {
	fulldata := "testtststst."

	var chunk string
	if skip+limit > len(fulldata) {
		chunk = fulldata[skip:]
	} else {
		chunk = fulldata[skip : skip+limit]
	}
	return []byte(chunk), skip + len(chunk)
}

func chunkUploader(session *session.Session, key string, errch chan<- error, reader *io.PipeReader) {
	_, err := s3manager.NewUploader(session).Upload(&s3manager.UploadInput{
		Bucket:             aws.String(system.S3_BUCKET),
		Key:                aws.String(key),
		Body:               reader,
		ContentDisposition: aws.String("attachment"), // or "inline" = the file will be displayed in the browser if possible
		ContentType:        aws.String("text/plain"), // change this to you content type, for example application/json
	})
	errch <- err
}

// ------------

func S3_UploadPDFencript(c *fiber.Ctx) error {
	// open the PDF file
	buffer := system.ReadFile("document.pdf")
	// encrypt the file
	encryptedData, err := core.Encrypt(buffer)
	if err != nil {
		panic(err)
	}

	result := core.UploadFile("PDF/dd22.pdf", false, encryptedData)

	if result {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"Upload":  result,
			"message": "File saved in bucket",
		})
	}

	return c.Status(fiber.StatusConflict).JSON(fiber.Map{
		"Upload":  result,
		"message": "Error saving file to bucket",
	})
}

func S3_DownloadAndDecryptPDF(c *fiber.Ctx) error {
	file := core.DownloadFile("PDF/dd22.pdf", false)

	system.SaveFile(file, "dd22.pdf")

	c.Status(fiber.StatusOK)
	// set the response headers
	c.Set("Content-Type", "application/pdf")
	c.Set("Content-Disposition", "attachment; filename=decrypted_document.pdf")
	return c.Send(file)
}
