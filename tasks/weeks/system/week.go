package system

import (
	"time"
)

func EsPrimerViernes(fecha time.Time) bool {
	// Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
	diaSemana := fecha.Weekday()

	// Verificar si es viernes (5)
	if diaSemana == time.Friday {
		// Verificar si está dentro de los primeros siete días del mes
		if fecha.Day() <= 7 {
			return true
		}
	}

	return false
}

func GetWeekStartAndEnd(date time.Time) (time.Time, time.Time) {
	// Obtén el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
	weekday := date.Weekday()
	// Calcula la fecha de inicio de la semana (lunes)
	weekStart := date.AddDate(0, 0, -int(weekday))
	// Calcula la fecha de fin de la semana
	weekEnd := weekStart.AddDate(0, 0, 6)
	return weekStart, weekEnd
}

func GetLastFridayOfMonth(year int, month time.Month) time.Time {
	// Obtiene el último día del mes
	lastDayOfMonth := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC)

	// Encuentra el último viernes del mes
	for {
		if lastDayOfMonth.Weekday() == time.Friday {
			return lastDayOfMonth
		}
		lastDayOfMonth = lastDayOfMonth.AddDate(0, 0, -1)
	}
}

func DateInInterval(fecha, fechaInicio, fechaFin time.Time) bool {
	return fecha.Equal(fechaInicio) || fecha.Equal(fechaFin) || (fecha.After(fechaInicio) && fecha.Before(fechaFin))
}

func GetSecondFridayOfMonth(year int, month time.Month) time.Time {
	// Obtener el primer día del mes
	firstDayOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)

	// Encontrar el primer viernes del mes
	for i := 0; i < 7; i++ {
		currentDay := firstDayOfMonth.AddDate(0, 0, i)
		if currentDay.Weekday() == time.Friday {
			// Encontrar el segundo viernes (8 días después del primero)
			secondFriday := currentDay.AddDate(0, 0, 7)
			return secondFriday
		}
	}

	// Si no se encuentra un viernes en el primer ciclo, regresar una fecha inválida
	return time.Time{}
}

// Calcula las fechas de inicio y fin de cada trimestre
// for i := 0; i < 4; i++ { // Imprime los próximos 4 trimestres
// 	startDate := time.Date(2024, time.January, 1, 0, 0, 0, 0, time.UTC)
// 	trimestreStart := startDate.AddDate(0, i*3, 0)
// 	trimestreEnd := trimestreStart.AddDate(0, 3, -1)

// 	// Calcula el último viernes del trimestre
// 	lastFriday := getLastFridayOfMonth(trimestreEnd.Year(), trimestreEnd.Month())

//		fmt.Printf("Trimestre %d: %s to %s - Último viernes: %s\n", i+1, trimestreStart.Format("01/02/06"), trimestreEnd.Format("01/02/06"), lastFriday.Format("01/02/06"))
//	}
//
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
