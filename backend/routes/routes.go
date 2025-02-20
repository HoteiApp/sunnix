package routes

import (
	"github.com/HoteiApp/sunnix/backend/controllers"
	"github.com/HoteiApp/sunnix/backend/polities"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
)

func Routes(app *fiber.App) {
	app.Get("/metrics", monitor.New(
		monitor.Config{
			Title:   "Zentinelle API Metrics",
			APIOnly: true,
		}))
	api := app.Group("api")
	// TODO Caundo se terminen las pruebas pasar a que solo los admin y hr pueden crear los usuarios
	api.Post("/register", controllers.Register).Name("Register")
	api.Post("/speech", controllers.HandleTextToSpeech).Name("Speech")

	api.Post("/login", controllers.AuthLogin).Name("AuthLogin")
	api.Post("/logout", controllers.AuthLogout).Name("AuthLogout")
	// -- Is logged in
	api.Use(polities.LoggedIn)
	// ----------------------------------------------------------------------
	api.Get("/active", controllers.AuthActiveUser).Name("AuthActiveUser")
	api.Post("/checkemail", polities.LoggedNotAccess, controllers.CheckEmail).Name("CheckEmail")
	// ----------------------------------------------------------------------
	// -- User Active Info
	my := api.Group("my")
	my.Post("/changepassword", controllers.ChangePassword).Name("ChangePassword")
	my.Use(polities.LoggedNotAccess)
	my.Get("/logs", controllers.LogsGetMy).Name("LogsGetMy")
	my.Get("/activity", controllers.MyActivityChart).Name("MyActivityChart")
	// --
	my.Post("/signature", controllers.ChangeSignature).Name("ChangeSignature")
	my.Post("/generatePDF", controllers.GeneratePDF).Name("GeneratePDF")

	// ----------------------------------------------------------------------
	voice := api.Group("voice")
	voice.Post("/get", controllers.VoiceGet).Name("VoicePost")
	voice.Post("/", controllers.VoicePost).Name("VoicePost")
	voice.Delete("/", controllers.VoiceDelete).Name("VoiceDelete")
	// ----------------------------------------------------------------------
	hiring := api.Group("hiring")
	hiring.Put("/personalInformationPut", controllers.HiringPersonalInformationPut).Name("HiringPersonalInformationPut")
	hiring.Put("/educationPut", controllers.HiringEducationPut).Name("HiringEducationPut")
	hiring.Put("/employmentHistoryPut", controllers.HiringEmploymentHistoryPut).Name("HiringEmploymentHistoryPut")
	hiring.Put("/personalReferencesPut", controllers.HiringPersonalReferencesPut).Name("HiringPersonalReferencesPut")
	hiring.Put("/emergencyMedicalPut", controllers.HiringEmergencyMedicalPut).Name("HiringEmergencyMedicalPut")
	hiring.Put("/directDepositPut", controllers.HiringDirectDepositPut).Name("HiringDirectDepositPut")
	hiring.Post("/sign", controllers.Signature).Name("Signature")

	// TODO Adaptar las funcion para guardar los file en un bucket en aws
	upload := hiring.Group("upload")
	upload.Post("/:file", controllers.S3UploadFile).Name("HiringUploadFiles")

	download := hiring.Group("download")
	download.Get("/:file", controllers.HiringDownloadFilesS3).Name("HiringDownloadFilesS3")
	download.Get("/:id/:file", controllers.HiringEmailDownloadFiles).Name("HiringEmailDownloadFiles")
	// -------------
	verification := api.Group("verification")
	verification.Put("/serviceModifyDate", controllers.VerificationDateServiceModify).Name("VerificationDateServiceModify")

	core := api.Group("core")
	core.Get("/statistics", controllers.CoreStatistics).Name("CoreStatistics")
	core.Get("/list/users", controllers.CoreListUser).Name("CoreListUser")
	core.Get("/list/hiring", controllers.CoreListUserHiring).Name("CoreListUserHiring")
	// core.Get("/list/requestNewClients", controllers.CoreListRequestNewClients).Name("CoreListRequestNewClients")
	core.Get("/list/applications", controllers.CoreListUserApplication).Name("CoreListUserApplication")
	core.Get("/list/user/:uid", controllers.CoreGetinfoUid).Name("CoreGetinfoUid")

	core.Post("/approveuser", controllers.ApproveUser).Name("ApproveUser")
	core.Post("/changeuserpassword", controllers.ChangeUserPassword).Name("ChangeUserPassword")
	// ----------------------------------------------------------------------
	// -- AI routes
	ai := api.Group("ai")
	ai.Post("/traslate", controllers.AiTraslate).Name("AiTraslate")
	ai.Post("/ask", controllers.AiAsk).Name("AiAsk")
}
