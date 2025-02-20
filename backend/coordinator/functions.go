package coordinator

import (
	"time"

	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"gorm.io/gorm"
)

// -- Function to mark active weeks in the database
func GetWeekDates(t time.Time) []time.Time {
	// Calcular cuántos días hay hasta el próximo domingo
	offset := int(time.Sunday - t.Weekday())
	if offset < 0 {
		offset += 7
	}

	// Encontrar el próximo domingo
	sunday := t.AddDate(0, 0, offset)

	// Generar las fechas de la semana
	weekDates := make([]time.Time, 7)
	for i := range weekDates {
		weekDates[i] = sunday.AddDate(0, 0, i)
	}

	return weekDates
}

func GetPreviousWeekDates(t time.Time) []time.Time {
	// Calcular cuántos días hay hasta el domingo anterior
	offset := int(time.Sunday-t.Weekday()) - 7

	// Encontrar el domingo anterior
	sunday := t.AddDate(0, 0, offset)

	// Generar las fechas de la semana anterior
	weekDates := make([]time.Time, 7)
	for i := range weekDates {
		weekDates[i] = sunday.AddDate(0, 0, i)
	}

	return weekDates
}

func ActiveWeek() {
	weekDates := GetPreviousWeekDates(time.Now())
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		var currentWeek models.Week
		var previousWeek models.Week
		// Encuentra la semana anterior a la actual
		db.Where("start = ?", weekDates[0].Format("01/02/2006")).Find(&currentWeek)
		// Encuentra la semana anterior
		db.Where("id = ?", currentWeek.ID-1).Find(&previousWeek)
		// Actualiza el campo 'active' de la semana anterior a false
		db.Model(&previousWeek).Update("active", false)
		// Actualiza el campo 'active' de la semana actual a true
		db.Model(&currentWeek).Update("active", true)
		return true
	})
}
