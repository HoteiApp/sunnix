package rpc

import (
	"fmt"
	"log"
	"net"

	pauth "github.com/HoteiApp/sunnix/backend/protos/auth"
	pb "github.com/HoteiApp/sunnix/backend/protos/billing"
	"github.com/HoteiApp/sunnix/backend/system"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedBillingServiceServer
	pauth.UnimplementedAuthUserServer
}

func RpcServer() {
	// Iniciar el servidor
	lis, err := net.Listen("tcp", ":"+system.RpcPort)
	if err != nil {
		log.Fatalf("Error al iniciar el servidor: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterBillingServiceServer(s, &server{})
	pauth.RegisterAuthUserServer(s, &server{})

	fmt.Println("RPC Server running...")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Error al ejecutar el servidor: %v", err)
	}
}
