package rpc

import (
	"context"
	"fmt"
	"log"

	"github.com/HoteiApp/sunnix/backend/controllers"
	pauth "github.com/HoteiApp/sunnix/backend/protos/auth"
	pb "github.com/HoteiApp/sunnix/backend/protos/billing"
)

// Implementación de la función ProcessBilling para el servidor
func (s *server) ProcessBilling(ctx context.Context, req *pb.Billing) (*pb.Response, error) {
	log.Printf("Recibido: Semana %d, Fecha %s", req.Week, req.Date)
	return &pb.Response{Message: fmt.Sprintf("Facturación procesada para la semana %d en la fecha %s", req.Week, req.Date)}, nil
}

func (s *server) GetActiveUser(ctx context.Context, req *pauth.UserRequest) (*pauth.ActiveUser, error) {

	activeUser := controllers.GetUserInfo(req.UserId) // Llamada a GetUserInfo que devuelve un modelo ActiveUser

	// Mapea cada campo de ActiveUser a pbAuth.ActiveUser
	pbActiveUser := &pauth.ActiveUser{
		User: &pauth.User{
			Id:                  uint32(activeUser.User.ID),
			Uid:                 activeUser.User.Uid,
			Email:               activeUser.User.Email,
			Nick:                activeUser.User.Nick,
			ChangePassword:      activeUser.User.ChangePassword,
			Status:              activeUser.User.Status,
			SecurityCode:        activeUser.User.SecurityCode,
			Global:              activeUser.User.Global,
			Approved:            activeUser.User.Approved,
			Active:              activeUser.User.Active,
			ReferrerId:          uint32(activeUser.User.ReferrerID),
			Roll:                activeUser.User.Roll,
			Credentials:         activeUser.User.Credentials,
			TemporarySupervisor: activeUser.User.TemporarySupervisor,
			Signature:           activeUser.User.Signature,
			HrCanSign:           activeUser.User.HrCanSign,
			QaCanSign:           activeUser.User.QaCanSign,
			SupervisorCanSign:   activeUser.User.SupervisorCanSign,
			Record:              uint32(activeUser.User.Record),
			Supervisor:          activeUser.User.Supervisor,
			PaymentByUnits:      float32(activeUser.User.PaymentByUnits),
		},
		Record: &pauth.WorkerRecord{
			Id:                 uint32(activeUser.Record.ID),
			Uid:                activeUser.Record.Uid,
			FullName:           activeUser.Record.FullName,
			Email:              activeUser.Record.Email,
			Address:            activeUser.Record.Address,
			City:               activeUser.Record.City,
			State:              activeUser.Record.State,
			ZipCode:            activeUser.Record.ZipCode,
			County:             activeUser.Record.County,
			HomePhone:          activeUser.Record.HomePhone,
			CellPhone:          activeUser.Record.CellPhone,
			SocialSecurity:     activeUser.Record.SocialSecurity,
			Dob:                activeUser.Record.Dob,
			ApplicationDate:    activeUser.Record.ApplicationDate,
			ApplyingAs:         activeUser.Record.ApplyingAs,
			PositionApplied:    activeUser.Record.PositionApplied,
			AvailableStartDate: activeUser.Record.AvailableStartDate,
			AvailableFor:       activeUser.Record.AvailableFor,
			Question1:          activeUser.Record.Question1,
			Question2:          activeUser.Record.Question2,
			// Continúa mapeando los demás campos...
		},
		Signature: activeUser.Signature,
		WeekActive: &pauth.Week{
			Id:     uint32(activeUser.WeekActive.ID),
			Start:  activeUser.WeekActive.Start,
			End:    activeUser.WeekActive.End,
			Active: activeUser.WeekActive.Active,
		},
		Events:       make([]*pauth.Event, len(activeUser.Events)),
		Conversation: make([]*pauth.OutConversation, len(activeUser.Conversation)),
	}

	// Mapeo de los eventos
	for i, event := range activeUser.Events {
		pbActiveUser.Events[i] = &pauth.Event{
			Id:          uint32(event.ID),
			User:        uint32(event.User),
			Date:        event.Date,
			Title:       event.Title,
			Description: event.Description,
		}
	}

	// Mapeo de las conversaciones
	for i, conv := range activeUser.Conversation {
		pbActiveUser.Conversation[i] = &pauth.OutConversation{
			Id:          conv.Id,
			User:        conv.User,
			Online:      conv.Online,
			Nick:        conv.Nick,
			LastMessage: conv.LastMessage,
		}
	}

	return pbActiveUser, nil
}
