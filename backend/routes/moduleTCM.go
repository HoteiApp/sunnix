package routes

import (
	"github.com/HoteiApp/sunnix/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func ModuleTCMRoutes(app *fiber.App) error {

	myGlobal := app.Group("/api/my")
	myGlobal.Post("/diary", controllers.Diary).Name("Diary") // ok

	module := app.Group("/api/module")

	// -- Events
	tcm := module.Group("/tcm")

	my := tcm.Group("/my")
	my.Get("/clients", controllers.TCMClients).Name("TCMClients")                          // ok
	my.Get("/clientsActives", controllers.TCMClientsActiveCsm).Name("TCMClientsActiveCsm") // ok
	// Notes
	my.Get("/notes", controllers.GetMyNotes).Name("GetMyNotes")
	my.Post("/notesDate", controllers.GetMyNotesDate).Name("PostMyNotesDate")
	my.Get("/notesWeekActive", controllers.CoreGetNotesWeekActive).Name("CoreGetNotesWeekActive")
	// Billing
	my.Get("/billing", controllers.GetMyBilling).Name("GetMyBilling")
	// SUPERVISOR
	my.Get("/tcms", controllers.SupervisorTCMs).Name("SupervisorTCMs")
	my.Get("/supervisions/pending", controllers.SupervisorPendingSupervisions).Name("SupervisorPendingSupervisions")
	// Payments
	my.Get("/payments", controllers.ModuleTcmPaymentsTCMMy).Name("ModuleTcmPaymentsTCMMy")

	// -- Clients
	clients := tcm.Group("/clients")
	clients.Get("/requestNewClients", controllers.CoreListRequestNewClients).Name("CoreListRequestNewClients")
	clients.Put("/requestNewClient", controllers.ClientsRequestNewClientePut).Name("NewCliente")                                  //ok
	clients.Post("/requestEditClient", controllers.ClientsRequestEditClientePost).Name("EditCliente")                             //ok
	clients.Post("/requestEditSCMClient", controllers.ClientsRequestEditSCMClientePost).Name("EditSCMCliente")                    //ok
	clients.Put("/requestAddSCMSure", controllers.ClientsRequestAddSCMSurePut).Name("ClientsRequestAddSCMSurePut")                //
	clients.Post("/requestEditSCMSure", controllers.ClientsRequestEditSCMSurePost).Name("EditSCMSure")                            //ok
	clients.Post("/requestSubmitSCMSure", controllers.ClientsRequestSubmitCMSurePost).Name("SubmitSCMSure")                       //ok
	clients.Post("/requestEditSCMCertification", controllers.ClientsRequestEditSCMCertificationPost).Name("EditSCMCertification") //ok
	clients.Post("/requestEditSCMAssessment", controllers.ClientsRequestEditSCMAssessmentPost).Name("EditSCMAssessment")          //ok
	clients.Post("/requestEditSCMSpInitial", controllers.ClientsRequestEditSCMSpPost).Name("EditSCMSp")                           //ok

	clients.Get("/list/all", controllers.ClientsListAllGet).Name("ClientsListAllGet") //ok
	clients.Get("/list/:id", controllers.ClientGet).Name("ClientsGet")                //ok

	clients.Get("/scm/:id", controllers.ClientSCMGet).Name("ClientsSCMGet")            // ok
	clients.Put("/add", controllers.ClientsNewClientePut).Name("ClientsNewClientePut") //ok

	service := clients.Group("service")
	service.Get("/SCMactive/:id", controllers.ClientGetServiceSCMactive).Name("ClientGetServiceSCMactive") //ok

	// -- Supervisions
	supervisions := tcm.Group("/supervisions")
	supervisions.Get("/", controllers.SupervisionsGetAll).Name("SupervisionsGetAll")
	supervisions.Put("/user/", controllers.SupervisionsUserCreateUpdate).Name("SupervisionsUserCreateUpdate")
	supervisions.Post("/user/", controllers.SupervisionsUserEdit).Name("SupervisionsUserEdit")
	supervisions.Get("/user/:id", controllers.SupervisionsGetUser).Name("SupervisionsGetUser")
	supervisions.Post("/complete/", controllers.SupervisionsComplete).Name("SupervisionsComplete")
	// Notes
	notes := tcm.Group("/notes")
	notes.Get("/notes/:client", controllers.CoreGetNotesClient).Name("CoreGetNotesClient")
	notes.Put("/", controllers.NotesAdd).Name("NotesAdd")
	notes.Post("/", controllers.NotesEdit).Name("NotesEdit")
	notes.Delete("/:id", controllers.NotesDelete).Name("NotesDelete")
	// Billing
	bill := tcm.Group("/billing")
	// -- Bill Week Active
	bill.Put("/", controllers.PutBillAdd).Name("PutBillAdd")
	bill.Get("/", controllers.BillActiveWeek).Name("BillActiveWeek")
	bill.Post("/view", controllers.BillView).Name("BillView")
	bill.Post("/period", controllers.BillPeriod).Name("BillPeriod")
	bill.Post("/periodTcm", controllers.BillPeriodTcm).Name("BillPeriodTcm")
	bill.Post("/periodBusiness", controllers.BillPeriodBusiness).Name("BillPeriodBusiness")
	bill.Post("/businessconfig", controllers.BusinessConfig).Name("BusinessConfig")
	bill.Get("/tcms/", controllers.BillActiveWeekTCMS).Name("BillActiveWeekTCMS")
	bill.Get("/biller/", controllers.BillActiveWeekBiller).Name("BillActiveWeekBiller")
	bill.Delete("/", controllers.DeleteBillWeekActive).Name("DeleteBillWeekActive")

	bill.Post("/approve", controllers.ApproveBill).Name("ApproveBill")
	bill.Post("/invoiced", controllers.InvoicedBill).Name("InvoicedBill")
	bill.Post("/paid", controllers.PaidBill).Name("PaidBill")
	bill.Post("/paidUnits", controllers.PaidUnitsBill).Name("PaidUnitsBill")
	// Payments
	payments := tcm.Group("/payments")
	payments.Get("/all", controllers.ModuleTcmPaymentsAll).Name("ModuleTcmPaymentsAll")
	payments.Post("/tcm", controllers.ModuleTcmPaymentsTCM).Name("ModuleTcmPaymentsTCM")
	payments.Post("/business", controllers.ModuleTcmPaymentsBusiness).Name("ModuleTcmPaymentsBusiness")
	payments.Post("/notes", controllers.ModuleTcmPaymentsTCMNotes).Name("ModuleTcmPaymentsTCMNotes")
	payments.Put("/add", controllers.ModuleTcmPaymentAdd).Name("ModuleTcmPaymentAdd")
	// TCMS
	tcms := tcm.Group("/tcms")
	tcms.Get("/all", controllers.CoreGetTCMS).Name("CoreGetTCMS")
	// PDF
	pdf := tcm.Group("/pdf")
	pdf.Post("/", controllers.GeneratePDF).Name("GeneratePDF")
	// S3
	s3 := tcm.Group("/s3")
	s3.Get("/", controllers.S3List).Name("S3List")
	s3.Post("/uploadPDF", controllers.S3Upload).Name("S3Upload")
	s3.Post("/downloadZip", controllers.S3DownloadZip).Name("S3DownloadZip")
	s3.Post("/downloadPdf", controllers.S3DownloadPDF).Name("S3DownloadPDF")
	s3.Post("/uploadFile/:file", controllers.S3UploadFile).Name("S3UploadFile")
	s3.Post("/presignedURL", controllers.S3PresignedURL).Name("S3PresignedURL")
	s3.Delete("/object", controllers.S3DeleteObj).Name("S3DeleteObj")
	// -- Return
	return nil
}
