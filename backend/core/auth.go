package core

import (
	"encoding/json"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"gorm.io/gorm"
)

func CheckLogin(email, password string) bool {
	var user models.Users
	result, _ := database.WithDB(func(db *gorm.DB) interface{} {
		db.Where("email = ? AND password_hash = ?", email, system.GetMD5Hash(password)).First(&user)
		return user
	})

	if result.(models.Users).Email != "" {
		return true
	}
	return false
}

func CheckEmail(email string) bool {
	result := ExtractFunctionsPlugins("ldap", "Search", "(&(mail="+email+"))")
	bytes, _ := json.Marshal(&result)

	var resultSearch ldap.SearchResult
	_ = json.Unmarshal(bytes, &resultSearch)

	if len(resultSearch.Entries) > 0 {
		return true
	}

	return false
}

// func GetUserFromLDAP(uid string) (*models.Users, error) {
// 	result := ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")

// 	bytes, _ := json.Marshal(&result)
// 	var resultSearch ldap.SearchResult
// 	if err := json.Unmarshal(bytes, &resultSearch); err != nil {
// 		return nil, err
// 	}

// 	if len(resultSearch.Entries) > 0 {
// 		userLdap := resultSearch.Entries[0]

// 		id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
// 		user := &models.Users{
// 			ID:             uint(id),
// 			Uid:            userLdap.GetAttributeValue("uid"),
// 			Email:          userLdap.GetAttributeValue("mail"),
// 			Nick:           userLdap.GetAttributeValue("givenName"),
// 			SecurityCode:   system.StringToBool(userLdap.GetAttributeValue("securityCode")),
// 			Active:         system.StringToBool(userLdap.GetAttributeValue("active")),
// 			Approved:       system.StringToBool(userLdap.GetAttributeValue("approved")),
// 			Global:         system.StringToBool(userLdap.GetAttributeValue("global")),
// 			ChangePassword: system.StringToBool(userLdap.GetAttributeValue("changePassword")),
// 			Signature:      userLdap.GetAttributeValue("signature"),
// 			Roll:           userLdap.GetAttributeValue("roll"),
// 			Credentials:    userLdap.GetAttributeValue("credentials"),
// 			Supervisor:     userLdap.GetAttributeValue("supervisor"),
// 		}

// 		return user, nil
// 	}

// 	return nil, fmt.Errorf("user not found")
// }
