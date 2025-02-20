package core

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"github.com/go-ldap/ldap/v3"
	"gorm.io/gorm"
)

func GetWorkerRecord(uid string) models.WorkerRecord {
	var record models.WorkerRecord
	// Search Active Topic
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {

		// --
		db.Where("uid = ?", uid).Find(&record)
		return true
	})
	return record
}

func GetUserFromLDAP(uid string) (*models.Users, error) {
	result := ExtractFunctionsPlugins("ldap", "Search", "(&(uid="+uid+"))")

	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	if err := json.Unmarshal(bytes, &resultSearch); err != nil {
		return nil, err
	}

	if len(resultSearch.Entries) > 0 {
		userLdap := resultSearch.Entries[0]

		id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
		user := &models.Users{
			ID:             uint(id),
			Uid:            userLdap.GetAttributeValue("uid"),
			Email:          userLdap.GetAttributeValue("mail"),
			Nick:           userLdap.GetAttributeValue("givenName"),
			SecurityCode:   system.StringToBool(userLdap.GetAttributeValue("securityCode")),
			Active:         system.StringToBool(userLdap.GetAttributeValue("active")),
			Approved:       system.StringToBool(userLdap.GetAttributeValue("approved")),
			Global:         system.StringToBool(userLdap.GetAttributeValue("global")),
			ChangePassword: system.StringToBool(userLdap.GetAttributeValue("changePassword")),
			Signature:      userLdap.GetAttributeValue("signature"),
			Roll:           userLdap.GetAttributeValue("roll"),
			Credentials:    userLdap.GetAttributeValue("credentials"),
			Supervisor:     userLdap.GetAttributeValue("supervisor"),
		}

		return user, nil
	}

	return nil, fmt.Errorf("user not found")
}

func GetUsersFromLDAP(filter string) []models.Users {
	result := ExtractFunctionsPlugins("ldap", "Search", filter)

	bytes, _ := json.Marshal(&result)
	var resultSearch ldap.SearchResult
	if err := json.Unmarshal(bytes, &resultSearch); err != nil {
		return nil
	}

	if len(resultSearch.Entries) > 0 {
		var users []models.Users

		for _, userLdap := range resultSearch.Entries {
			id, _ := strconv.ParseUint(userLdap.GetAttributeValue("id"), 10, 64)
			paymentbyunits, _ := strconv.ParseFloat(userLdap.GetAttributeValue("paymentByUnits"), 64)
			rent, _ := strconv.ParseFloat(userLdap.GetAttributeValue("rent"), 64)
			users = append(users, models.Users{
				ID:           uint(id),
				Uid:          userLdap.GetAttributeValue("uid"),
				Email:        userLdap.GetAttributeValue("mail"),
				Nick:         userLdap.GetAttributeValue("givenName"),
				SecurityCode: system.StringToBool(userLdap.GetAttributeValue("securityCode")),
				Active:       system.StringToBool(userLdap.GetAttributeValue("active")),
				Approved:     system.StringToBool(userLdap.GetAttributeValue("approved")),
				// Global:         system.StringToBool(userLdap.GetAttributeValue("global")),
				ChangePassword: system.StringToBool(userLdap.GetAttributeValue("changePassword")),
				Signature:      userLdap.GetAttributeValue("signature"),
				Roll:           userLdap.GetAttributeValue("roll"),
				Credentials:    userLdap.GetAttributeValue("credentials"),
				Supervisor:     userLdap.GetAttributeValue("supervisor"),
				// TODO: Cambiar en LDAP el campo global por fixedPay
				FixedPay:       system.StringToBool(userLdap.GetAttributeValue("global")),
				PaymentByUnits: paymentbyunits,
				Rent:           rent,
				Business:       userLdap.GetAttributeValue("business"),
			})

		}
		return users
	}

	return nil
}
