package core

import (
	"fmt"
	"log"
	"time"

	"github.com/HoteiApp/sunnix/plugins/s3/system"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

// -- Crea una nueva sesión usando las credenciales y la región por defecto
func CreateSession(init bool) *session.Session {
	var sess *session.Session
	var err error
	if system.S3_USE == "minio" {
		sess, err = session.NewSession(&aws.Config{
			Region:           aws.String(system.S3_REGION),
			Endpoint:         aws.String(system.S3_ENDPOINT),
			S3ForcePathStyle: aws.Bool(true),
			Credentials: credentials.NewStaticCredentials(
				system.ACCESS_KEY,
				system.SECRET_KEY,
				"",
			),
		})
	} else {
		sess, err = session.NewSession(&aws.Config{
			Region: aws.String(system.S3_REGION),
			Credentials: credentials.NewStaticCredentials(
				system.ACCESS_KEY,
				system.SECRET_KEY,
				"",
			),
		})
	}
	if err != nil {
		fmt.Println(err)
	}
	if init {
		system.SESSION = sess
	}
	return sess
}

// -- Listar Bucket
func ListeFiles() []map[string]string {
	// Crea un cliente de S3
	svc := s3.New(system.SESSION)

	// Llama a ListObjectsV2 para obtener la lista de objetos en el bucket
	result, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(system.S3_BUCKET),
	})
	if err != nil {
		log.Fatalf("Error listing objects: %v", err)
	}

	// Crea una lista para almacenar los objetos y sus URLs
	var objects []map[string]string

	// Recorre los objetos y genera las URLs con tiempo de expiración
	for _, item := range result.Contents {
		req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(system.S3_BUCKET),
			Key:    aws.String(*item.Key),
		})
		url, err := req.Presign(5 * time.Minute)
		if err != nil {
			log.Fatalf("Error al generar URL con tiempo de expiración: %v", err)
		}
		objects = append(objects, map[string]string{
			"Key": *item.Key,
			"URL": url,
		})
	}

	return objects
}

func ListeFilesInFolder(folder string) []map[string]string {
	// Crea un cliente de S3
	svc := s3.New(system.SESSION)

	// Llama a ListObjectsV2 para obtener la lista de objetos en el bucket que empiecen con la carpeta dada
	result, _ := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(system.S3_BUCKET),
		Prefix: aws.String(folder), // Filtra los objetos que empiezan con la carpeta
	})

	// Crea una lista para almacenar los objetos y sus URLs
	var objects []map[string]string

	// Recorre los objetos y genera las URLs con tiempo de expiración
	for _, item := range result.Contents {
		req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(system.S3_BUCKET),
			Key:    aws.String(*item.Key),
		})

		// Genera una URL con tiempo de expiración (5 minutos)
		url, _ := req.Presign(5 * time.Minute)

		// Agrega el objeto y su URL a la lista
		objects = append(objects, map[string]string{
			"Key": *item.Key,
			"URL": url,
		})
	}

	return objects
}

// Función para obtener una URL presignada
func GetPresignedURL(key string, expiration time.Duration) string {
	svc := s3.New(system.SESSION)
	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(system.S3_BUCKET),
		Key:    aws.String(key),
	})

	url, err := req.Presign(expiration)
	if err != nil {
		return ""
	}
	return url
}

// Función para obtener una URL presignada de los avatars
func GetAvatarsURL(uids []string, expiration time.Duration) map[string]string {
	svc := s3.New(system.SESSION)
	avatars := make(map[string]string)

	for _, uid := range uids {
		key := "records/" + uid + "/avatar.png"

		// Verifica si el objeto existe
		_, err := svc.HeadObject(&s3.HeadObjectInput{
			Bucket: aws.String(system.S3_BUCKET),
			Key:    aws.String(key),
		})
		if err != nil {
			// No existe el archivo
			continue
		}

		// URL presignada con expiración
		req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(system.S3_BUCKET),
			Key:    aws.String(key),
		})
		url, err := req.Presign(expiration)
		if err != nil {
			continue
		}
		avatars[uid] = url

	}

	return avatars
}
