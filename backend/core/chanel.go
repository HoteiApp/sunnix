package core

import (
	"fmt"
	"reflect"

	"github.com/HoteiApp/sunnix/backend/system"
)

// InitializeChannelListening  -- Initialize channel listening
// NOTE In this function all the channels that are created will be added
func InitializeChannelListening() {
	for {
		select {
		case log := <-system.Log:
			requestValue := reflect.ValueOf(log)
			SendLogs(
				requestValue.FieldByName("App").String(),
				requestValue.FieldByName("Action").String(),
				requestValue.FieldByName("LoggedIn").String(),
				requestValue.FieldByName("Username").String(),
				requestValue.FieldByName("Description").String(),
				int(requestValue.FieldByName("Client").Int()),
			)
		case notify := <-system.Notify:
			fmt.Println(notify)
			// requestValue := reflect.ValueOf(notify)
			// SendNotification(
			// 	requestValue.FieldByName("UserId").String(),
			// 	requestValue.FieldByName("Sender").String(),
			// 	requestValue.FieldByName("Message").String(),
			// )
		}
	}
}
