package main

import (
	"fmt"
	"time"

	"github.com/HoteiApp/sunnix/tasks/weeks/database"
	"github.com/HoteiApp/sunnix/tasks/weeks/models"
	"github.com/HoteiApp/sunnix/tasks/weeks/system"
	"gorm.io/gorm"
)

func init() {
	database.InitDB()
}

func GetPermissions() []string {
	return system.Permissions
}

func CalculateWeeksAndFortnights(arg ...interface{}) interface{} {
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		startDate := time.Date(2024, time.March, 3, 0, 0, 0, 0, time.UTC)
		for i := 0; i < 2400; i++ {
			weekStart, weekEnd := system.GetWeekStartAndEnd(startDate)

			// Procesa la semana
			var week models.Week
			week.Start = weekStart.Format("01/02/2006")
			week.End = weekEnd.Format("01/02/2006")
			db.Where(&models.Week{Start: week.Start, End: week.End}).FirstOrCreate(&week)

			// Avanza a la siguiente semana
			startDate = startDate.AddDate(0, 0, 7)
			weekStart1, weekEnd1 := system.GetWeekStartAndEnd(startDate)

			var weekSecond models.Week
			weekSecond.Start = weekStart1.Format("01/02/2006")
			weekSecond.End = weekEnd1.Format("01/02/2006")
			db.Where(&models.Week{Start: weekSecond.Start, End: weekSecond.End}).FirstOrCreate(&weekSecond)

			// Calcula la fecha 20 días después de weekEnd1
			nextDate := weekEnd1.AddDate(0, 0, 20)
			// Calcula la fecha del viernes de la semana que está 20 días después de weekEnd1
			fridayDate := nextDate.AddDate(0, 0, -int(nextDate.Weekday())+5)

			// Procesa la quincena
			var weeks models.Fortnight
			weeks.Start = weekStart.Format("01/02/2006")
			weeks.End = weekEnd.Format("01/02/2006")
			weeks.StartSecond = weekStart1.Format("01/02/2006")
			weeks.EndSecond = weekEnd1.Format("01/02/2006")
			weeks.PayDate = fridayDate.Format("01/02/2006")
			db.Where(&models.Fortnight{Start: weeks.Start, End: weeks.End, StartSecond: weeks.StartSecond, EndSecond: weeks.EndSecond}).Assign(models.Fortnight{PayDate: weeks.PayDate}).FirstOrCreate(&weeks)
			// Avanza a la siguiente semana
			startDate = startDate.AddDate(0, 0, 7)
		}
		return true
	})

	return true
}
func ActiveWeek(arg ...interface{}) interface{} {
	weekDates := system.GetPreviousWeekDates(time.Now())
	startDate := weekDates[0].Format("01/02/2006")

	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		// Usa transacciones para garantizar consistencia
		err := db.Transaction(func(tx *gorm.DB) error {
			var currentWeek, previousWeek models.Week
			// Encuentra la semana actual y la semana previamente activa
			if err := tx.Where("start = ?", startDate).First(&currentWeek).Error; err != nil {
				return fmt.Errorf("no se encontró la semana actual: %v", err)
			}
			if err := tx.Where("active = ?", true).First(&previousWeek).Error; err == nil {
				// Desactiva la semana anterior, si existe
				if err := tx.Model(&previousWeek).Update("active", false).Error; err != nil {
					return fmt.Errorf("error al desactivar la semana anterior: %v", err)
				}
			}
			// Activa la semana actual
			if err := tx.Model(&currentWeek).Update("active", true).Error; err != nil {
				return fmt.Errorf("error al activar la semana actual: %v", err)
			}
			// --- Manejo de quincena activa ---
			var currentFortnight, previousFortnight models.Fortnight
			// Encuentra la quincena actual
			if err := tx.Where("start = ? OR start_second = ?", startDate, startDate).First(&currentFortnight).Error; err != nil {
				return fmt.Errorf("no se encontró la quincena actual: %v", err)
			}
			if currentFortnight.Start == startDate && !currentFortnight.Active {
				// Encuentra la quincena previamente activa
				if err := tx.Where("active = ?", true).First(&previousFortnight).Error; err == nil {
					// Desactiva la quincena anterior
					if err := tx.Model(&previousFortnight).Update("active", false).Error; err != nil {
						return fmt.Errorf("error al desactivar la quincena anterior: %v", err)
					}
				}
				// Activa la quincena actual
				if err := tx.Model(&currentFortnight).Update("active", true).Error; err != nil {
					return fmt.Errorf("error al activar la quincena actual: %v", err)
				}
			}
			return nil
		})
		// Manejo de errores de la transacción
		if err != nil {
			fmt.Printf("Error al actualizar la semana/quincena activa: %v\n", err)
			return false
		}
		return true
	})
	return false
}

// func ActiveWeek(arg ...interface{}) interface{} {
// 	weekDates := system.GetPreviousWeekDates(time.Now())
// 	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
// 		var currentWeek models.Week
// 		var previousWeek models.Week
// 		// Encuentra la semana anterior a la actual
// 		db.Where("start = ?", weekDates[0].Format("01/02/2006")).Find(&currentWeek)
// 		// Encuentra la semana que estaba activa
// 		db.Where("active = ?", true).Find(&previousWeek)
// 		// Actualiza el campo 'active' de la semana anterior a false
// 		db.Model(&previousWeek).Update("active", false)
// 		// Actualiza el campo 'active' de la semana actual a true
// 		db.Model(&currentWeek).Update("active", true)

// 		// --- Quincena activa
// 		var currentFortnight models.Fortnight
// 		// Encuentra la quincena anterior a la actual
// 		db.Where("start = ? or start_second = ?", weekDates[0].Format("01/02/2006"), weekDates[0].Format("01/02/2006")).Find(&currentFortnight)
// 		// Actualiza el campo 'active' de la quincena actual a true
// 		if currentFortnight.Start == weekDates[0].Format("01/02/2006") && (!currentFortnight.Active) {
// 			var previousFortnight models.Fortnight
// 			db.Where("active = ?", true).Find(&previousFortnight)
// 			// Actualiza el campo 'active' de la quincena anterior a false
// 			db.Model(&previousFortnight).Update("active", false)
// 			// Actualiza el campo 'active' de la quincena actual a true
// 			db.Model(&currentFortnight).Update("active", true)
// 		}
// 		fmt.Println(currentFortnight)
// 		return true
// 	})
// 	return true
// }
