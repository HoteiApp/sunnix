package database

import (
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"gorm.io/gorm"
)

// InitialsValues es una función que lee un archivo JSON,
// recorre las supervisiones y actualiza o crea nuevas entradas en la base de datos.
func InitialsValues() {
	// Leer el archivo JSON
	supervFile := system.JsonRead()

	// Recorrer las supervisiones en el archivo JSON
	for _, sup := range supervFile.Supervisions {
		var supervisions_domain models.SupervisionsDomain

		// Buscar en la base de datos una entrada que coincida con el orden de la supervisión
		result, _ := WithDB(func(db *gorm.DB) interface{} {
			return db.Where("`order` = ?", sup.Order).First(&supervisions_domain)
		})

		// Si no se encuentra una entrada en la base de datos, crear una nueva
		if result.(*gorm.DB).RowsAffected == 0 {
			_, _ = WithDB(func(db *gorm.DB) interface{} {
				supervisions_domain.Order = sup.Order
				supervisions_domain.Active = sup.Active
				supervisions_domain.Domain = sup.Domain
				return db.Create(&supervisions_domain)
			})
		} else {
			// Si se encuentra una entrada en la base de datos, actualizarla
			_, _ = WithDB(func(db *gorm.DB) interface{} {
				supervisions_domain.Order = sup.Order
				supervisions_domain.Active = sup.Active
				supervisions_domain.Domain = sup.Domain
				db.Save(&supervisions_domain)
				// -----
				for _, topic := range sup.Topics {
					var top models.SupervisionsTopics
					getTopic := db.Where("domain = ? and `order` = ?", supervisions_domain.ID, topic.Order).First(&top)
					// -- Si no existe el Topic
					if getTopic.RowsAffected == 0 {
						top.Domain = int(supervisions_domain.ID)
						top.Order = topic.Order
						top.Title = topic.Title
						top.Hour = topic.Hour
						db.Create(&top)
					} else {
						top.Title = topic.Title
						top.Hour = topic.Hour
						db.Save(&top)
					}
				}
				return true
			})
		}
	}
}
