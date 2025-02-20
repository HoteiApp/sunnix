package core

import "github.com/HoteiApp/sunnix/backend/models"

// Función para obtener el código correspondiente según el tipo de archivo
func GetCode(typeFile string) string {
	codeMap := map[string]string{
		"resume":                       "resume",
		"diploma_transcripts":          "diploma_transcripts",
		"licenses_certifications":      "licenses_certifications",
		"course_fcb":                   "course_fcb",
		"service_trainer_provider":     "service_trainer_provider",
		"service_cpr_aed":              "service_cpr_aed",
		"service_osha":                 "service_osha",
		"service_infection_control":    "service_infection_control",
		"service_hiv_aids":             "service_hiv_aids",
		"service_domestic_violence":    "service_domestic_violence",
		"service_hippa":                "service_hippa",
		"service_security_awareness":   "service_security_awareness",
		"service_access_civil_rights":  "service_access_civil_rights",
		"service_deaf_hard":            "service_deaf_hard",
		"service_fars_cfars":           "service_fars_cfars",
		"other_medicaid_certification": "other_medicaid_certification",
		"other_medicaid_provider":      "other_medicaid_provider",
		"other_drivers_license":        "other_drivers_license",
		"other_social_security_card":   "other_social_security_card",
		"other_proof_legal_status":     "other_proof_legal_status",
		"other_employee_id_badge":      "other_employee_id_badge",
		"other_vehicle_registration":   "other_vehicle_registration",
		"other_proof_insurance":        "other_proof_insurance",
		"form_i9":                      "form_i9",
		"form_w9":                      "form_w9",
		"form_w4":                      "form_w4",
	}
	code, ok := codeMap[typeFile]
	if !ok {
		code = "resume"
	}
	return code
}

// Función para actualizar las propiedades de los documentos según el código
func UpdateDocuments(documents *models.NecessaryDocuments, code string) {
	switch code {
	case "resume":
		documents.Resume = true
	case "diploma_transcripts":
		documents.DiplomaTranscripts = true
	case "licenses_certifications":
		documents.LicensesCertifications = true
	case "course_fcb":
		documents.CourseFcb = true
	case "service_trainer_provider":
		documents.ServiceTrainerProvider = true
	case "service_cpr_aed":
		documents.ServiceCprAed = true
	case "service_osha":
		documents.ServiceOSHA = true
	case "service_infection_control":
		documents.ServiceInfectionControl = true
	case "service_hiv_aids":
		documents.ServiceHivAids = true
	case "service_domestic_violence":
		documents.ServiceDomesticViolence = true
	case "service_hippa":
		documents.ServiceHIPPA = true
	case "service_security_awareness":
		documents.ServiceSecurityAwarenes = true
	case "service_access_civil_rights":
		documents.ServicAccessCivilRights = true
	case "service_deaf_hard":
		documents.ServiceDeafHard = true
	case "service_fars_cfars":
		documents.ServiceFarsCfars = true
	case "other_medicaid_certification":
		documents.OtherMedicaidCertification = true
	case "other_medicaid_provider":
		documents.OtherMedicaidProvider = true
	case "other_drivers_license":
		documents.OtherDriversLicense = true
	case "other_social_security_card":
		documents.OtherSocialSecurityCard = true
	case "other_proof_legal_status":
		documents.OtherProofLegalStatus = true
	case "other_employee_id_badge":
		documents.OtherEmployeeIDBadge = true
	case "other_vehicle_registration":
		documents.OtherVehicleRegistration = true
	case "other_proof_insurance":
		documents.OtherProofInsurance = true
	case "form_i9":
		documents.FormI9 = true
	case "form_w9":
		documents.Formw9 = true
	case "form_w4":
		documents.Formw4 = true
	default:
		documents.Resume = true
	}
}
