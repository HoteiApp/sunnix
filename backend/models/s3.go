package models

type S3PresignedURL struct {
	Key      string `json:"key"`
	Duration string `json:"duration"`
}
