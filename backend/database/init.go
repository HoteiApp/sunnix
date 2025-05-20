package database

import (
	"fmt"

	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/HoteiApp/sunnix/backend/system"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	// Open a new connection to the database based on the DbType specified in the system configuration
	var db *gorm.DB
	var err error
	switch system.DbType {
	case "mysql":
		db, err = gorm.Open(mysql.Open(system.MysqlCredentials), &gorm.Config{})
	case "postgres":
		db, err = gorm.Open(postgres.Open(system.PosgresCredentials), &gorm.Config{})
	default:
		db, err = gorm.Open(sqlite.Open(system.DbSqliteName+".db"), &gorm.Config{})
	}
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %s", err.Error()))
	}
	// Configure the logger so that it does not show log messages in the console
	db.Logger = logger.Default.LogMode(logger.Silent)

	// Auto-migrate the Users
	// if err := db.AutoMigrate(&models.Users{}); err != nil {
	// 	panic(fmt.Sprintf("Failed to auto-migrate tables: %s", err.Error()))
	// }

	if err := db.AutoMigrate(&models.StaticPluginConfig{}, &models.PluginConfig{}, &models.ModuleConfig{}, &models.SystemPermissions{}, &models.UserPermissions{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate tables: %s", err.Error()))
	}

	// Auto-migrate the WorkerRecord and Subsections tables
	if err := db.AutoMigrate(&models.WorkerRecord{},
		&models.Educations{},
		&models.EmploymentHistory{},
		&models.PersonalReferences{},
		&models.EmergencyMedical{},
		&models.NecessaryDocuments{},
		&models.DirectDeposit{},
		&models.EmploymentVerification{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate tables: %s", err.Error()))
	}

	// Auto-migrate the RequestNewClient table
	// if err := db.AutoMigrate(&models.RequestNewClient{}); err != nil {
	// 	panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	// }

	// Auto-migrate the Logs table
	if err := db.AutoMigrate(&models.Logs{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}

	// -- Supervisions
	db.AutoMigrate(&models.SupervisionsDomain{}, &models.SupervisionsTopics{}, &models.SupervisionsUser{})
	// Auto-migrate the Client table
	if err := db.AutoMigrate(&models.RequestNewClient{}, &models.Clients{}, &models.ClienteSCMTcm{}, &models.ClientServiceCaseManagement{}, &models.ClientSCMDemografic{}, &models.ClientSCMSure{}, &models.ClientSCMSureFilesInCloud{}, &models.ClientSCMMedical{}, &models.ClientSCMMental{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}
	// Auto-migrate the Client Documents
	if err := db.AutoMigrate(&models.ClientSCMCertification{}, &models.ClientSCMAssessment{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}
	// Auto-migrate the Sp
	if err := db.AutoMigrate(&models.ClientSCMSp{}, &models.SpGoal1{}, &models.SpGoal2{}, &models.SpGoal3{}, &models.SpGoal4{}, &models.SpGoal5{}, &models.SpGoal6{}, &models.SpGoal7{}, &models.SpGoal8{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}
	// Auto-migrate the Notes table
	if err := db.AutoMigrate(&models.Notes{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}
	// Auto-migrate the Billing table
	if err := db.AutoMigrate(&models.Billing{}, &models.NotesBilling{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}
	// Auto-migrate the Payments table
	if err := db.AutoMigrate(&models.ModuleTcmRateRange{}, &models.ModuleTcmPaymentsRateRange{}, &models.ModuleTcmPayments{}, &models.ModuleTcmPaymentsTcm{}, &models.ModuleTcmNotesPayments{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}
	// Auto-migrate the TablePreference table
	if err := db.AutoMigrate(&models.TablePreference{}); err != nil {
		panic(fmt.Sprintf("Failed to auto-migrate table: %s", err.Error()))
	}

}

func WithDB(fn func(db *gorm.DB) interface{}) (interface{}, error) {
	var db *gorm.DB
	var err error
	switch system.DbType {
	case "mysql":
		db, err = gorm.Open(mysql.Open(system.MysqlCredentials), &gorm.Config{})
	case "postgres":
		db, err = gorm.Open(postgres.Open(system.PosgresCredentials), &gorm.Config{})
	default:
		db, err = gorm.Open(sqlite.Open(system.DbSqliteName+".db"), &gorm.Config{})
	}
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %s", err.Error())
	}
	defer func() {
		sqlDB, err := db.DB()
		if err != nil {
			fmt.Printf("failed to get DB instance: %s\n", err.Error())
			return
		}
		sqlDB.Close()
	}()
	return fn(db), nil
}
