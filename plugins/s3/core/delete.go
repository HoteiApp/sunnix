package core

import (
	"fmt"

	"github.com/HoteiApp/sunnix/plugins/s3/system"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
)

func DeleteObjet(key string) bool {
	svc := s3.New(system.SESSION)
	// Crear la solicitud de eliminación
	input := &s3.DeleteObjectInput{
		Bucket: aws.String(system.S3_BUCKET),
		Key:    aws.String(key),
	}
	// Ejecutar la solicitud de eliminación
	_, err := svc.DeleteObject(input)
	if err != nil {
		fmt.Println("Error eliminando el objeto:", err)
		return false
	}
	return true
}

// TODO: Terminar la funcion de eliminar folder con todo lo que tenga dentro.
// func DeleteFolder(folder string) {

// 	svc := s3.New(system.SESSION)

// 	// List objects in the folder
// 	listObjectsInput := &s3.ListObjectsV2Input{
// 		Bucket: aws.String(system.S3_BUCKET),
// 		Prefix: aws.String(folder),
// 	}

// 	listObjectsOutput, err := svc.ListObjectsV2(context.TODO(), listObjectsInput)
// 	if err != nil {
// 		log.Fatalf("unable to list objects, %v", err)
// 	}

// 	// Delete each object
// 	for _, object := range listObjectsOutput.Contents {
// 		deleteObjectInput := &s3.DeleteObjectInput{
// 			Bucket: aws.String(bucket),
// 			Key:    object.Key,
// 		}

// 		_, err := svc.DeleteObject(context.TODO(), deleteObjectInput)
// 		if err != nil {
// 			log.Fatalf("unable to delete object %v, %v", *object.Key, err)
// 		}

// 		fmt.Printf("Deleted %s\n", *object.Key)
// 	}

// 	fmt.Println("Folder deleted successfully")
// }
