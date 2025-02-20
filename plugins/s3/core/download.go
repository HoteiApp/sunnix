package core

import (
	"github.com/HoteiApp/sunnix/plugins/s3/system"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func DownloadFile(key string, encript bool) []byte {
	// create a downloader
	downloader := s3manager.NewDownloader(system.SESSION)

	// download the encrypted file from S3
	buffer := aws.NewWriteAtBuffer([]byte{})
	_, err := downloader.Download(buffer, &s3.GetObjectInput{
		Bucket: aws.String(system.S3_BUCKET),
		Key:    aws.String(key),
	})
	if err != nil {
		return nil
	}

	// decrypt the file
	if encript {
		decryptedData, err := Decrypt(buffer.Bytes())
		if err != nil {
			return nil
		}
		return decryptedData
	}

	return buffer.Bytes()
}
