package core

import (
	"bytes"
	"fmt"

	"github.com/HoteiApp/sunnix/plugins/s3/system"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func CreateFolders(folders []string) bool {
	// create an uploader
	uploader := s3manager.NewUploader(system.SESSION)

	// create folders if they don't exist
	for _, folder := range folders {
		_, err := uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String(system.S3_BUCKET),
			Key:    aws.String(folder),
			Body:   bytes.NewReader([]byte{}),
		})
		if err != nil {
			fmt.Println("Error creating folder:", folder, err)
		}
	}
	return true
}
