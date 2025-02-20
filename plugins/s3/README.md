# S3 Plugin Application

This application is designed to interact with AWS S3 buckets using a custom plugin system that wraps AWS SDK functionality. The plugin provides several functions for creating sessions, listing files, uploading, downloading, and deleting objects within an S3 bucket.

## Compilación

Para compilar el plugin, se debe ejecutar el siguiente comando en la línea de comandos:

```sh
go build -buildmode=plugin -trimpath -o s3.plugin ./main.go
```

## Table of Contents

- [S3 Plugin Application](#s3-plugin-application)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Initializing a Session](#initializing-a-session)
  - [Creating a New Session](#creating-a-new-session)
  - [Listing Files in a Bucket](#listing-files-in-a-bucket)
  - [Uploading a File](#uploading-a-file)
  - [Downloading a File](#downloading-a-file)
  - [Deleting an Object](#deleting-an-object)
  - [Functions](#functions)




## Usage
Add the following to the .env of your master application
```sh
# -- S3
#---------------------------------------------------------------------
sunissUp.s3.ACCESS_KEY=""
sunissUp.s3.SECRET_KEY=""
sunissUp.s3.S3_REGION="us-east-1"
sunissUp.s3.S3_BUCKET=""
# The number of bytes per chunk. Change this according to your case, this is just
# an example value used in this code because here we are creating chunks from a string.
# You can use something like 10 * 1024 * 1024 to set up chunk size to 10MB.
sunissUp.s3.CHUNK_SIZE="50"
#---------------------------------------------------------------------
```
### Initializing a Session

The `init()` function initializes a session, which allows other functions to interact with the S3 bucket without requiring re-authentication.

```go
func init() {
    core.CreateSession(true)
}
```

## Creating a New Session

To create a new session, use the NewSession function. Pass a boolean argument: true to save the session information globally.

```go
    system.ExtractFunctionsPlugins("s3","NewSession",[true|false])
```

## Listing Files in a Bucket

Use the ListeFiles function to list all objects within an S3 bucket.

```go
    system.ExtractFunctionsPlugins("s3","ListeFiles")
```

## Uploading a File

The UploadFile function uploads a file to the S3 bucket. It takes three arguments: the S3 key, a boolean indicating whether to encrypt the file, and the file path.

```go
    system.ExtractFunctionsPlugins("s3","UploadFile","fileKey", true, "path/to/file")
```

## Downloading a File

Use the DownloadFile function to download a file from the S3 bucket. The function takes two arguments: the S3 key and a boolean to indicate whether to decrypt the file automatically.

```go
    system.ExtractFunctionsPlugins("s3","DownloadFile","fileKey", true)
```

## Deleting an Object

To delete an object from the S3 bucket, use the DeleteObjet function with the S3 key as an argument.

```go
    system.ExtractFunctionsPlugins("s3","DeleteObjet","fileKey")
```

## Functions

    NewSession(arg ...interface{}) interface{}: Creates a new AWS session.
    ListeFiles(arg ...interface{}) interface{}: Lists files in the bucket.
    DeleteObjet(arg ...interface{}) interface{}: Deletes an object from the bucket.
    UploadFile(arg ...interface{}) interface{}: Uploads a file to the bucket, optionally encrypting it.
    DownloadFile(arg ...interface{}) interface{}: Downloads a file from the bucket, optionally decrypting it.
