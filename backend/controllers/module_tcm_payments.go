package controllers

import (
	"sort"
	"strconv"
	"time"

	"github.com/HoteiApp/sunnix/backend/core"
	"github.com/HoteiApp/sunnix/backend/database"
	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func ModuleTcmPaymentAdd(c *fiber.Ctx) error {
	// Obtener la fecha actual en formato mm/dd/yyyy
	currentDate := time.Now().Format("01/02/2006")
	var fortnight models.Fortnight

	// Buscar la quincena más cercana a la fecha actual
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.
			Where("STR_TO_DATE(pay_date, '%m/%d/%Y') >= STR_TO_DATE(?, '%m/%d/%Y')", currentDate).
			Order("STR_TO_DATE(pay_date, '%m/%d/%Y') ASC").
			Limit(1).
			Find(&fortnight).Error
	})
	// fmt.Println("Quincena-->", fortnight.Start, fortnight.EndSecond)

	// Obtener o crear el registro de pago
	var payments models.ModuleTcmPayments
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.FirstOrCreate(&payments, models.ModuleTcmPayments{
			Fortnight: int(fortnight.ID),
			Date:      fortnight.PayDate,
		}).Error
	})

	// Optener la fecha de pago anterior
	// TODO Aqui no solo se ptiene que escoge el pago anterio sino tambien todos los pagos que tengan notas pendientes
	var prevFortnight models.Fortnight
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.
			Where("id = ?", fortnight.ID-1).
			Limit(1).
			Find(&prevFortnight).Error
	})

	// Obtener los rangos de pago activo
	var rangesRate []models.ModuleTcmRateRange
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.
			Where("active = ?", true).
			Find(&rangesRate).Error
	})

	// Eliminar rangos que no están en el arreglo rangesRate
	var existingRanges []models.ModuleTcmPaymentsRateRange
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("payment = ?", payments.ID).Find(&existingRanges).Error
	})

	for _, existingRange := range existingRanges {
		found := false
		for _, rangeRate := range rangesRate {
			if existingRange.Range == int(rangeRate.ID) {
				found = true
				break
			}
		}
		if !found {
			database.WithDB(func(db *gorm.DB) interface{} {
				return db.Delete(&existingRange).Error
			})
		}
	}

	// Actualizar los rango activos para este payment
	for _, rangeRate := range rangesRate {
		var rangePayment models.ModuleTcmPaymentsRateRange
		database.WithDB(func(db *gorm.DB) interface{} {
			return db.FirstOrCreate(&rangePayment, models.ModuleTcmPaymentsRateRange{
				Payment: int(payments.ID),
				Range:   int(rangeRate.ID),
			}).Error
		})

		database.WithDB(func(db *gorm.DB) interface{} {
			rangePayment.From = rangeRate.From
			rangePayment.To = rangeRate.To
			rangePayment.Rate = rangeRate.Rate
			return db.Save(&rangePayment)
		})

	}

	// Buscar todas las notas facturadas antes de la quincena seleccionada
	var pendingNotes []models.Notes

	database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("STR_TO_DATE(date, '%m/%d/%Y') < STR_TO_DATE(?, '%m/%d/%Y') AND invoiced = ?", fortnight.Start, true).
			Where("(STR_TO_DATE(paid_date, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')) OR (STR_TO_DATE(paid_date2, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')) OR (STR_TO_DATE(paid_date3, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y'))", prevFortnight.PayDate, payments.Date, prevFortnight.PayDate, payments.Date, prevFortnight.PayDate, payments.Date).
			Order("date").
			Find(&pendingNotes).Error
	})

	// Notas del payment actual
	var notes []models.Notes
	database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("STR_TO_DATE(date, '%m/%d/%Y') BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y') AND invoiced = ?", fortnight.Start, fortnight.EndSecond, true).
			Order("date").
			Find(&notes).Error
	})

	// Agrupar las notas por TCM y luego por SCM
	groupedNotes := make(map[int]map[int][]models.Notes)

	for _, note := range notes {
		if _, exists := groupedNotes[note.Tcm]; !exists {
			groupedNotes[note.Tcm] = make(map[int][]models.Notes)
		}
		groupedNotes[note.Tcm][note.Scm] = append(groupedNotes[note.Tcm][note.Scm], note)

	}
	// TODO La idea es que con este grupo separa las notas pemdientes de la del payment actual
	// Agrupar las notas por TCM y luego por SCM
	groupedNotesPending := make(map[int]map[int][]models.Notes)
	// Add notes pendientes al payment
	for _, note := range pendingNotes {
		if _, exists := groupedNotesPending[note.Tcm]; !exists {
			groupedNotesPending[note.Tcm] = make(map[int][]models.Notes)
		}
		groupedNotesPending[note.Tcm][note.Scm] = append(groupedNotesPending[note.Tcm][note.Scm], note)
	}

	var totalUnits int
	var totalHours, totalPaid, totalProfit, totalVacation, totalPaidBillings float64

	for tcm, scmGroup := range groupedNotes {
		// Verificar si el TCM tiene notas facturadas en esta quincena
		if len(scmGroup) == 0 {
			continue
		}

		// Obtener datos del TCM desde LDAP
		tcmData := core.GetUsersFromLDAP("(&(id=" + strconv.Itoa(tcm) + "))")
		if len(tcmData) == 0 {
			continue
		}
		// ---------------------------------------------
		var paymentTcm models.ModuleTcmPaymentsTcm

		tcmsData := core.GetUsersFromLDAP("(&(uid=" + tcmData[0].Supervisor + "))")

		database.WithDB(func(db *gorm.DB) interface{} {
			// Buscar o crear el registro de pago para este TCM
			return db.FirstOrCreate(&paymentTcm, models.ModuleTcmPaymentsTcm{
				Payment:  int(payments.ID),
				Tcm:      uint(tcmData[0].ID),
				Business: strconv.Itoa(int(tcmsData[0].ID)),
			}).Error
		})
		// Update values of the payment
		database.WithDB(func(db *gorm.DB) interface{} {
			// Esto es para almacenar el estado de la factura para los pagos pendientes saber como pagarlos
			paymentTcm.FixedPay = tcmData[0].FixedPay
			paymentTcm.Rate = tcmData[0].PaymentByUnits * 4
			paymentTcm.RemainingRate = 12.07 - tcmData[0].PaymentByUnits

			paymentTcm.Rent = tcmsData[0].Rent

			return db.Save(&paymentTcm).Error
		})
		// ---------------------------------------------
		var tcmUnits, tcmUnitsPaid int

		for _, scmNotes := range scmGroup {
			var scmUnits, scmUnitsPaid int

			for _, note := range scmNotes {
				var paymentTcmNotes models.ModuleTcmNotesPayments

				database.WithDB(func(db *gorm.DB) interface{} {
					return db.FirstOrCreate(&paymentTcmNotes, models.ModuleTcmNotesPayments{
						PaymentTcm: int(paymentTcm.ID),
						Note:       int(note.ID),
					}).Error
				})

				paymentTcmNotes.Units = int(note.Units)

				// Controlar en numero del pago
				prevPayDate, _ := time.Parse("01/02/2006", prevFortnight.PayDate)
				paymentDate, _ := time.Parse("01/02/2006", payments.Date)

				notePaidDate, _ := time.Parse("01/02/2006", note.PaidDate)
				notePaidDate2, _ := time.Parse("01/02/2006", note.PaidDate2)
				notePaidDate3, _ := time.Parse("01/02/2006", note.PaidDate3)

				if prevPayDate.Before(notePaidDate) && notePaidDate.Before(paymentDate) {
					paymentTcmNotes.UnitsPaid = int(note.PaidUnits)
					paymentTcmNotes.Paid = note.Paid
					paymentTcmNotes.PaymentDate = payments.Date
				}

				if prevPayDate.Before(notePaidDate2) && notePaidDate2.Before(paymentDate) {
					paymentTcmNotes.UnitsPaid2 = int(note.PaidUnits2)
					paymentTcmNotes.Paid2 = note.Paid2
					paymentTcmNotes.PaymentDate2 = payments.Date
				}

				if prevPayDate.Before(notePaidDate3) && notePaidDate3.Before(paymentDate) {
					paymentTcmNotes.UnitsPaid3 = int(note.PaidUnits3)
					paymentTcmNotes.Paid3 = note.Paid3
					paymentTcmNotes.PaymentDate3 = payments.Date
				}

				paymentTcmNotes.Rate = tcmData[0].PaymentByUnits

				database.WithDB(func(db *gorm.DB) interface{} {
					return db.Save(&paymentTcmNotes)
				})

				scmUnits += int(note.Units)
				scmUnitsPaid += int(note.PaidUnits) + int(note.PaidUnits2) + int(note.PaidUnits3)
			}

			tcmUnits += scmUnits
			tcmUnitsPaid += scmUnitsPaid
		}

		// -- Calcular el pago del TCM por los rangos activos
		var cumulative float64
		tcmHours := float64(tcmUnits) / 4
		tcmHoursPaid := float64(tcmUnitsPaid) / 4

		// Si el TCM tiene pago fijo
		if paymentTcm.FixedPay {
			cumulative += tcmHoursPaid * paymentTcm.Rate
		} else {
			// Si el TCM tiene pago por rangos
			for _, rangeRate := range rangesRate {
				if tcmHoursPaid > 0 {
					// Calcular las unidades en el rango actual

					// TODO: Se Calcula por la cantidad de unidades de cada rango (30h a un precio + 5 ha otro y asi por cada rango)
					// var hoursInRange float64
					// if tcmHoursPaid >= float64(rangeRate.From) {
					// 	hoursInRange = math.Min(float64(rangeRate.To), tcmHoursPaid) - float64(rangeRate.From)
					// 	if tcmHoursPaid < float64(rangeRate.To) {
					// 		hoursInRange = tcmHoursPaid - float64(rangeRate.From)
					// 	}
					// 	cumulative += hoursInRange * rangeRate.Rate
					// }

					// TODO: Se busca el total de horas reportado en que rango cae y se paga por el rate de se rango

					// De esta forma se selecciona el rango por la cantidad de unidades pagadas del bill
					// if tcmHoursPaid >= float64(rangeRate.From) && tcmHoursPaid <= float64(rangeRate.To) {

					// De esta forma se selecciona el rango por la cantidad de unidades totales del bill
					if tcmHours >= float64(rangeRate.From) && tcmHours <= float64(rangeRate.To) {
						cumulative += tcmHoursPaid * rangeRate.Rate
					}
				}
			}
		}

		// Actualizar el registro de pago del TCM
		database.WithDB(func(db *gorm.DB) interface{} {
			paymentTcm.Units = tcmUnits
			paymentTcm.UnitsRetroactive = 0
			paymentTcm.UnitsPaid = tcmUnitsPaid
			paymentTcm.HoursPaid = tcmHoursPaid
			paymentTcm.Rate = tcmData[0].PaymentByUnits
			paymentTcm.Paid = cumulative
			paymentTcm.Profit = float64(tcmUnitsPaid)*(payments.Rate) - cumulative
			paymentTcm.Vacation = (cumulative) * 0.02

			return db.Save(&paymentTcm).Error
		})

		// Actualizar los valores totales
		totalUnits += tcmUnitsPaid
		totalHours += float64(tcmUnitsPaid) / 4
		totalPaid += float64(cumulative)
		totalProfit += float64(float64(totalUnits)*payments.Rate) - (cumulative)
		totalVacation += cumulative * 0.02
		totalPaidBillings += float64(totalHours*(payments.Rate*4)) * 0.03

	}

	// -----------------------------------------------------------------------------------------------------------------------------------
	var totalUnitsRetroactive int
	// var totalHoursRetroactive float64
	for tcm, scmGroup := range groupedNotesPending {
		// Verificar si el TCM tiene notas facturadas en esta quincena
		if len(scmGroup) == 0 {
			continue
		}
		// Obtener datos del TCM desde LDAP
		tcmData := core.GetUsersFromLDAP("(&(id=" + strconv.Itoa(tcm) + "))")
		if len(tcmData) == 0 {
			continue
		}

		// ---------------------------------------------
		var paymentTcm models.ModuleTcmPaymentsTcm

		database.WithDB(func(db *gorm.DB) interface{} {

			// Buscar o crear el registro de pago para este TCM
			return db.FirstOrCreate(&paymentTcm, models.ModuleTcmPaymentsTcm{
				Payment: int(payments.ID),
				Tcm:     uint(tcmData[0].ID),
			}).Error
		})
		// Update values of the payment

		for _, scmNotes := range scmGroup {
			for _, note := range scmNotes {
				if note.Paid == "Full" || note.Paid2 == "Full" || note.Paid3 == "Full" {
					// ---------------------------------------------
					var paymentTcmNotes models.ModuleTcmNotesPayments

					database.WithDB(func(db *gorm.DB) interface{} {
						return db.FirstOrCreate(&paymentTcmNotes, models.ModuleTcmNotesPayments{
							Note: int(note.ID),
						}).Error
					})

					if paymentTcmNotes.PaymentTcm == 0 {
						paymentTcmNotes.PaymentTcm = int(paymentTcm.ID)
						paymentTcmNotes.Rate = tcmData[0].PaymentByUnits
					}

					paymentTcmNotes.Retroactive = true
					paymentTcmNotes.Units = int(note.Units)

					// Controlar en numero del pago
					prevPayDate, _ := time.Parse("01/02/2006", prevFortnight.PayDate)
					paymentDate, _ := time.Parse("01/02/2006", payments.Date)

					notePaidDate, _ := time.Parse("01/02/2006", note.PaidDate)
					notePaidDate2, _ := time.Parse("01/02/2006", note.PaidDate2)
					notePaidDate3, _ := time.Parse("01/02/2006", note.PaidDate3)

					if prevPayDate.Before(notePaidDate) && notePaidDate.Before(paymentDate) {
						paymentTcmNotes.UnitsPaid = int(note.PaidUnits)
						paymentTcmNotes.Paid = note.Paid
						paymentTcmNotes.PaymentDate = payments.Date
					}

					if prevPayDate.Before(notePaidDate2) && notePaidDate2.Before(paymentDate) {
						paymentTcmNotes.UnitsPaid2 = int(note.PaidUnits2)
						paymentTcmNotes.Paid2 = note.Paid2
						paymentTcmNotes.PaymentDate2 = payments.Date
					}

					if prevPayDate.Before(notePaidDate3) && notePaidDate3.Before(paymentDate) {
						paymentTcmNotes.UnitsPaid3 = int(note.PaidUnits3)
						paymentTcmNotes.Paid3 = note.Paid3
						paymentTcmNotes.PaymentDate3 = payments.Date
					}

					database.WithDB(func(db *gorm.DB) interface{} {
						return db.Save(&paymentTcmNotes)
					})

					// ---------------------------------------------
					// Buscar el valor por el que se pago en el payment de la nota
					var paymentTcmN models.ModuleTcmPaymentsTcm

					database.WithDB(func(db *gorm.DB) interface{} {
						// Buscar o crear el registro de pago para este TCM
						return db.Where("ID = ?", paymentTcmNotes.PaymentTcm).Find(&paymentTcmN)
					})

					// ------------------------------------
					// ------------------------------------
					// ------------------------------------
					// -- Calcular el pago del TCM por los rangos activos
					var cumulative float64

					tcmHoursPaid := float64(note.Units) / 4

					// Si el TCM tiene pago fijo

					cumulative += tcmHoursPaid * (paymentTcmN.Rate * 4)

					// Actualizar el registro de pago del TCM
					database.WithDB(func(db *gorm.DB) interface{} {
						paymentTcm.UnitsRetroactive += note.Units

						paymentTcm.Paid += cumulative
						paymentTcm.Profit += float64(note.Units)*(payments.Rate) - cumulative
						paymentTcm.Vacation += (cumulative) * 0.02

						return db.Save(&paymentTcm).Error
					})
					// ------------------------------------
					// ------------------------------------
					// Actualizar los valores totales
					totalUnitsRetroactive += note.Units

					totalPaid += float64(cumulative)
					totalProfit += float64(note.Units)*(payments.Rate) - cumulative
					totalVacation += cumulative * 0.02
					totalPaidBillings += float64(float64(note.Units/4)*(payments.Rate*4)) * 0.03
				}

			}
		}
	}

	// -------------------------------------

	// Actualizar el registro de pagos principal
	database.WithDB(func(db *gorm.DB) interface{} {
		payments.UnitsPaid = totalUnits
		payments.HoursPaid = totalHours

		payments.UnitsPaidRetroactive = totalUnitsRetroactive
		payments.HoursPaidRetroactive = float64(totalUnitsRetroactive / 4)

		payments.Paid = totalPaid
		payments.Profit = totalProfit
		payments.Vacation = totalVacation
		payments.PaidBillings = totalPaidBillings
		return db.Save(&payments).Error
	})

	if totalUnits == 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "The active fortnight has no notes to bill.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Payment calculation completed successfully.",
		"data":    payments,
	})
}

func ModuleTcmPaymentsAll(c *fiber.Ctx) error {
	// Variable para almacenar los registros de pagos
	var payments []models.ModuleTcmPayments

	// Consultar la base de datos con las relaciones necesarias
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Order("id desc").Find(&payments)
	})

	// Verificar si hay registros
	if len(payments) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No payments found.",
		})
	}

	// Responder con la lista de pagos
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "Payments retrieved successfully.",
		"payments": payments,
	})
}

// Esto es para sacar el payroll del business
func ModuleTcmPaymentsBusiness(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	// Esto es el id del business
	id := data["id"]
	var record models.WorkerRecord
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("id = ?", id).Find(&record)
	})

	// listTcm := core.GetUsersFromLDAP("(&(supervisor=" + record.Uid + "))")

	var allOut []models.ModuleTcmPaymentsTcmOut
	// for _, tcmP := range listTcm {
	// Variable para almacenar los registros de pagos
	var paymentsTcm []models.ModuleTcmPaymentsTcm
	// Consultar la base de datos con las relaciones necesarias
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("business = ?", id).Find(&paymentsTcm)
	})

	for _, tcm := range paymentsTcm {

		var ranges []models.ModuleTcmPaymentsRateRange
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("payment = ?", tcm.Payment).Find(&ranges)
		})

		tcmData := core.GetUsersFromLDAP("(&(id=" + strconv.Itoa(int(tcm.Tcm)) + "))")
		if len(tcmData) == 0 {
			continue
		}
		var payment models.ModuleTcmPayments
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", tcm.Payment).First(&payment)
		})

		var fortnight models.Fortnight
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", payment.Fortnight).First(&fortnight)
		})

		allOut = append(allOut, models.ModuleTcmPaymentsTcmOut{
			Id:      int(tcm.ID),
			Payment: tcm.Payment,
			Tcm:     tcm.Tcm,
			TcmName: tcmData[0].Nick,

			Fortnight: fortnight,

			Date: payment.Date,

			FixedPay: tcm.FixedPay,

			Rate:          tcm.Rate,
			RemainingRate: tcm.RemainingRate,

			Rent: tcm.Rent,

			Units:            tcm.Units,
			UnitsRetroactive: tcm.UnitsRetroactive,

			UnitsPaid: tcm.UnitsPaid,
			HoursPaid: tcm.HoursPaid,

			Paid:     tcm.Paid,
			Profit:   tcm.Profit,
			Vacation: tcm.Vacation,

			Range: ranges,

			Visible:   tcm.Visible,
			Approved:  tcm.Approved,
			Collected: tcm.Collected,
		})
	}
	// }

	groupedPayments := make(map[int]models.ModuleTcmPaymentsOut)

	for _, payment := range allOut {
		if _, exists := groupedPayments[payment.Payment]; !exists {
			var payments models.ModuleTcmPayments
			_, _ = database.WithDB(func(db *gorm.DB) interface{} {
				return db.Where("id = ?", payment.Payment).Find(&payments)
			})

			groupedPayments[payment.Payment] = models.ModuleTcmPaymentsOut{
				Id:        payment.Payment,
				Fortnight: int(payment.Fortnight.ID),
				Date:      payments.Date,
				Rate:      payments.Rate,
				Rent:      payment.Rent,
				UnitsPaid: 0,
				HoursPaid: 0,

				Paid:   0,
				Profit: 0,

				PaidBillings: 0,

				Vacation: 0,

				Range:    payment.Range,
				Visible:  payment.Visible,
				Approved: payment.Approved,
				Tcm:      []models.ModuleTcmPaymentsTcmOut{},
			}
		}

		tempPayment := groupedPayments[payment.Payment]

		tempPayment.UnitsPaid = tempPayment.UnitsPaid + payment.UnitsPaid + payment.UnitsRetroactive
		tempPayment.HoursPaid = float64(tempPayment.UnitsPaid) / 4
		tempPayment.Paid = tempPayment.Paid + payment.Paid
		tempPayment.Profit = tempPayment.Profit + payment.Profit
		tempPayment.Tcm = append(tempPayment.Tcm, payment)
		// tempPayment.Rent =

		groupedPayments[payment.Payment] = tempPayment
	}

	var result []models.ModuleTcmPaymentsOut
	for _, payment := range groupedPayments {

		result = append(result, payment)
	}

	// Responder con la lista de pagos agrupados
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "Payments Business retrieved successfully.",
		"payments": result,
	})
}

func ModuleTcmPaymentsTCM(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id := data["id"]
	// Variable para almacenar los registros de pagos
	var paymentsTcm []models.ModuleTcmPaymentsTcm

	// Consultar la base de datos con las relaciones necesarias
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("payment = ?", id).Find(&paymentsTcm)
	})

	// Verificar si hay registros
	if len(paymentsTcm) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No payments Tcm found.",
		})
	}

	var ranges []models.ModuleTcmPaymentsRateRange
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("payment = ?", id).Find(&ranges)
	})

	var out []models.ModuleTcmPaymentsTcmOut
	for _, tcm := range paymentsTcm {
		tcmData := core.GetUsersFromLDAP("(&(id=" + strconv.Itoa(int(tcm.Tcm)) + "))")
		if len(tcmData) == 0 {
			continue
		}
		var payment models.ModuleTcmPayments
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", tcm.Payment).First(&payment)
		})

		// fmt.Println("TCM-->", tcm.Tcm, tcm.Payment, tcm.UnitsRetroactive)

		var fortnight models.Fortnight
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", payment.Fortnight).First(&fortnight)
		})

		out = append(out, models.ModuleTcmPaymentsTcmOut{
			Id:      int(tcm.ID),
			Payment: tcm.Payment,
			Tcm:     tcm.Tcm,
			TcmName: tcmData[0].Nick,

			Fortnight: fortnight,

			Date: payment.Date,

			FixedPay: tcm.FixedPay,

			Rate:          tcm.Rate,
			RemainingRate: tcm.RemainingRate,

			Units:            tcm.Units,
			UnitsRetroactive: tcm.UnitsRetroactive,

			UnitsPaid: tcm.UnitsPaid,
			HoursPaid: tcm.HoursPaid,

			Paid:     tcm.Paid,
			Profit:   tcm.Profit,
			Vacation: tcm.Vacation,

			Range: ranges,

			Visible:   tcm.Visible,
			Approved:  tcm.Approved,
			Collected: tcm.Collected,
		})
	}

	// Responder con la lista de pagos
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":     "Payments TCM retrieved successfully.",
		"ranges":      ranges,
		"paymentsTcm": out,
	})
}

func ModuleTcmPaymentsTCMMy(c *fiber.Ctx) error {

	claims, _ := GetClaims(c)
	// Variable para almacenar los registros de pagos
	var paymentsTcm []models.ModuleTcmPaymentsTcm

	// Consultar la base de datos con las relaciones necesarias
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("tcm = ?", claims["ID"]).Order("payment desc").Find(&paymentsTcm)
	})

	// Verificar si hay registros
	if len(paymentsTcm) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No payments Tcm found.",
		})
	}

	var out []models.ModuleTcmPaymentsTcmOut
	for _, tcm := range paymentsTcm {
		var payment models.ModuleTcmPayments
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", tcm.Payment).First(&payment)
		})

		var ranges []models.ModuleTcmPaymentsRateRange
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("payment = ?", tcm.Payment).Find(&ranges)
		})

		var fortnight models.Fortnight
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", payment.Fortnight).First(&fortnight)
		})

		out = append(out, models.ModuleTcmPaymentsTcmOut{
			Id:        int(tcm.ID),
			Payment:   tcm.Payment,
			Tcm:       tcm.Tcm,
			TcmName:   claims["FullName"].(string),
			Fortnight: fortnight,
			Date:      payment.Date,

			FixedPay: tcm.FixedPay,

			Rate:          tcm.Rate,
			RemainingRate: tcm.RemainingRate,

			Units:            tcm.Units,
			UnitsRetroactive: tcm.UnitsRetroactive,

			UnitsPaid: tcm.UnitsPaid,
			HoursPaid: tcm.HoursPaid,
			// UnitsPending: tcm.UnitsPending,

			Paid:     tcm.Paid,
			Profit:   tcm.Profit,
			Vacation: tcm.Vacation,

			Range: ranges,

			Visible:   tcm.Visible,
			Approved:  tcm.Approved,
			Collected: tcm.Collected,
		})
	}

	// Responder con la lista de pagos
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":     "Payments TCM retrieved successfully.",
		"paymentsTcm": out,
	})
}

func ModuleTcmPaymentsTCMNotes(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id := data["id"]
	// Variable para almacenar los registros de pagos
	var paymentsNotes []models.ModuleTcmNotesPayments
	// fmt.Println("ID-->", id)
	// Consultar la base de datos con las relaciones necesarias
	_, _ = database.WithDB(func(db *gorm.DB) interface{} {
		return db.Where("payment_tcm = ?", id).Find(&paymentsNotes)
	})

	// Verificar si hay registros
	// if len(paymentsNotes) == 0 {
	// 	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
	// 		"message": "No payments Notes found.",
	// 	})
	// }
	var paymentsNotesout []models.ModuleTcmNotesPaymentsout
	var retroactivesNotesout []models.ModuleTcmNotesPaymentsout
	for _, note := range paymentsNotes {
		// TODO Aqui no estan llegando las retroactivas
		var noteData models.Notes
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", note.Note).First(&noteData)
		})

		var cscm models.ClientServiceCaseManagement
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", noteData.Scm).First(&cscm)
		})
		var client models.Clients
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", cscm.Client).First(&client)
		})

		var sure models.ClientSCMSure
		_, _ = database.WithDB(func(db *gorm.DB) interface{} {
			return db.Where("id = ?", noteData.Insurance).First(&sure)
		})
		if note.Retroactive {
			retroactivesNotesout = append(retroactivesNotesout, models.ModuleTcmNotesPaymentsout{
				Id:         int(note.ID),
				PaymentTcm: note.PaymentTcm,
				Note:       note.Note,

				Sure:     sure.PlanID,
				SureName: sure.PlanName,

				Client:      client.FirstName + " " + client.LastName,
				Rate:        note.Rate,
				Retroactive: note.Retroactive,
				Date:        noteData.Date,
				Units:       note.Units,

				UnitsPaid:    note.UnitsPaid,
				UnitsPending: note.UnitsPending,
				Paid:         note.Paid,
				PaidDate:     note.PaymentDate,

				UnitsPaid2:    note.UnitsPaid2,
				UnitsPending2: note.UnitsPending2,
				Paid2:         note.Paid2,
				PaidDate2:     note.PaymentDate2,

				UnitsPaid3:    note.UnitsPaid3,
				UnitsPending3: note.UnitsPending3,
				Paid3:         note.Paid3,
				PaidDate3:     note.PaymentDate3,
			})
		} else {
			paymentsNotesout = append(paymentsNotesout, models.ModuleTcmNotesPaymentsout{
				Id:          int(note.ID),
				PaymentTcm:  note.PaymentTcm,
				Note:        note.Note,
				Sure:        sure.PlanID,
				SureName:    sure.PlanName,
				Client:      client.FirstName + " " + client.LastName,
				Rate:        note.Rate,
				Retroactive: note.Retroactive,
				Date:        noteData.Date,
				Units:       note.Units,

				UnitsPaid:    note.UnitsPaid,
				UnitsPending: note.UnitsPending,
				Paid:         note.Paid,
				PaidDate:     note.PaymentDate,

				UnitsPaid2:    note.UnitsPaid2,
				UnitsPending2: note.UnitsPending2,
				Paid2:         note.Paid2,
				PaidDate2:     note.PaymentDate2,

				UnitsPaid3:    note.UnitsPaid3,
				UnitsPending3: note.UnitsPending3,
				Paid3:         note.Paid3,
				PaidDate3:     note.PaymentDate3,
			})
		}

	}

	sort.Slice(paymentsNotesout, func(i, j int) bool {
		dateI, _ := time.Parse("01/02/2006", paymentsNotesout[i].Date)
		dateJ, _ := time.Parse("01/02/2006", paymentsNotesout[j].Date)
		return dateI.After(dateJ)
	})

	sort.Slice(retroactivesNotesout, func(i, j int) bool {
		dateI, _ := time.Parse("01/02/2006", retroactivesNotesout[i].Date)
		dateJ, _ := time.Parse("01/02/2006", retroactivesNotesout[j].Date)
		return dateI.After(dateJ)
	})

	// Responder con la lista de pagos
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "Payments TCM Notes retrieved successfully.",
		"notes":        paymentsNotesout,
		"retroactives": retroactivesNotesout,
	})
}
