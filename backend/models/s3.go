package models

type S3PresignedURL struct {
	Key      string `json:"key"`
	Duration string `json:"duration"`
}

type S3GetDocs struct {
	Path string `json:"path"`
}

type ExtractDocs struct {
	Key string `json:"Key"`
	URL string `json:"URL"`
}
