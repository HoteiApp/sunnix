package core

import (
	"context"
	"fmt"
	"io"

	"github.com/HoteiApp/sunnix/plugins/polly/system"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/polly"
	"github.com/aws/aws-sdk-go-v2/service/polly/types"
)

func GenerateMp3toText(text, voiceId string) (io.ReadCloser, error) {
	if system.AccessKey == "" || system.SecretKey == "" || system.Region == "" {
		return nil, fmt.Errorf("credenciales o región AWS no definidas en .env")
	}

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(system.Region),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(system.AccessKey, system.SecretKey, "")),
	)
	if err != nil {
		return nil, fmt.Errorf("error cargando configuración de AWS: %w", err)
	}

	client := polly.NewFromConfig(cfg)

	input := &polly.SynthesizeSpeechInput{
		OutputFormat: types.OutputFormatMp3,
		Text:         aws.String(text),
		VoiceId:      types.VoiceId(voiceId),
	}

	result, err := client.SynthesizeSpeech(context.TODO(), input)
	if err != nil {
		return nil, fmt.Errorf("error generando audio: %w", err)
	}

	return result.AudioStream, nil
}
