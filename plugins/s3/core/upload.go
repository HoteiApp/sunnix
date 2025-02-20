package core

import (
	"bytes"

	"github.com/HoteiApp/sunnix/plugins/s3/system"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func UploadFile(key string, encript bool, buffer []byte) bool {
	// create an uploader
	if encript {
		buffer, _ = Encrypt(buffer)
	}

	uploader := s3manager.NewUploader(system.SESSION)
	// upload the file to S3
	_, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(system.S3_BUCKET),
		Key:    aws.String(key),
		Body:   bytes.NewReader(buffer),
	})
	return err == nil
}
