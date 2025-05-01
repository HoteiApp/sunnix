package core

import (
	"context"
	"io"

	"github.com/HoteiApp/sunnix/plugins/polly/system"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/polly"
	"github.com/aws/aws-sdk-go-v2/service/polly/types"
)

func GenerateMp3toText(text, voiceId string) io.ReadCloser {

	if system.AccessKey == "" || system.SecretKey == "" || system.Region == "" {
		panic("Credenciales o región AWS no definidas en .env")
	}

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(system.Region),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(system.AccessKey, system.SecretKey, "")),
	)

	if err != nil {
		panic("error cargando configuración de AWS: " + err.Error())
	}

	client := polly.NewFromConfig(cfg)

	input := &polly.SynthesizeSpeechInput{
		OutputFormat: types.OutputFormatMp3,
		Text:         aws.String(text),
		VoiceId:      types.VoiceId(voiceId),
	}

	result, err := client.SynthesizeSpeech(context.TODO(), input)
	if err != nil {
		panic("error generando audio: " + err.Error())
	}

	// outFile, err := os.Create("salida.mp3")
	// if err != nil {
	// 	panic("error creando archivo: " + err.Error())
	// }
	// defer outFile.Close()

	// _, err = io.Copy(outFile, result.AudioStream)
	// if err != nil {
	// 	panic("error escribiendo audio: " + err.Error())
	// }
	return result.AudioStream
	// fmt.Println("✅ Audio guardado como salida.mp3")
}
