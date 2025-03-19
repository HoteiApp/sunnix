/bin/bash
# Ahi que tener el aws cli instalado
# https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
# Y tener configurado el profile
# https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
aws s3 sync s3://system-storage-pro ./s3

# Utilizando solo minio
mc alias set s3-cloud https://s3.amazonaws.com ACCESS_KEY_SECRET SECRET_KEY_SECRET
# Copiar los archivos de s3 a minio la primera vez
./mc cp --recursive s3-cloud/ minio-local/sunnix-pro

# Sincronizar los archivos de s3 a minio 
./mc mirror --overwrite s3-cloud/system-storage-pro/ minio-local/sunnix-pro