package coordinator

import "github.com/jasonlvhit/gocron"

func RunCron() {
	//---------------------------------------------------------
	// -- update active week
	//---------------------------------------------------------
	// go ActiveWeek()
	//---------------------------------------------------------
	// -- Scheduled operations
	//---------------------------------------------------------
	// -- Every day at 00:00 pm update active week
	// gocron.Every(1).Day().At("00:00").Do(ActiveWeek)
	//---------------------------------------------------------
	<-gocron.Start()
}
