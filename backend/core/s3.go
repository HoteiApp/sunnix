package core

import "strings"

// batchGetAvatars obtiene múltiples avatares de S3 en una sola operación
func BatchGetAvatars(uids []string) (map[string]string, error) {
	// Implementación que lista todos los avatares en una sola llamada a S3
	avatars := make(map[string]string)
	for _, uid := range uids {
		objectsUrl := ExtractFunctionsPlugins("s3", "ListeFilesInFolder", "records/"+uid+"/")
		for _, doc := range objectsUrl.([]map[string]string) {
			if strings.Contains(doc["Key"], "avatar") {
				avatars[uid] = doc["URL"]
				break
			}
		}
	}
	return avatars, nil
}
