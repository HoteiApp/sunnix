package models

import "gorm.io/gorm"

type Notes struct {
	gorm.Model
	Tcm       int `json:"tcm"`
	Scm       int `json:"scm"`
	Week      int `json:"weeks"`
	Insurance int `json:"insurance"`

	Date     string `json:"date"`
	Billable string `json:"billable"`

	Minutes  int    `json:"minutes"`
	Units    int    `json:"units"`
	Timein   string `json:"timeIn"`
	Timeout  string `json:"timeOut"`
	Location string `json:"location"`

	Opening     string `json:"opening"`
	Sp          string `json:"sp"`
	Addendums   string `json:"addendums"`
	Sprfollowup string `json:"sprfollowup"`
	Spr         string `json:"spr"`
	Closing     string `json:"closing"`

	Description string `json:"description"`

	Timein2   string `json:"timeIn_2"`
	Timeout2  string `json:"timeOut_2"`
	Location2 string `json:"location_2"`

	Opening2     string `json:"opening_2"`
	Sp2          string `json:"sp_2"`
	Addendums2   string `json:"addendums_2"`
	Sprfollowup2 string `json:"sprfollowup_2"`
	Spr2         string `json:"spr_2"`
	Closing2     string `json:"closing_2"`

	Description2 string `json:"description_2"`

	Timein3   string `json:"timeIn_3"`
	Timeout3  string `json:"timeOut_3"`
	Location3 string `json:"location_3"`

	Opening3     string `json:"opening_3"`
	Sp3          string `json:"sp_3"`
	Addendums3   string `json:"addendums_3"`
	Sprfollowup3 string `json:"sprfollowup_3"`
	Spr3         string `json:"spr_3"`
	Closing3     string `json:"closing_3"`

	Description3 string `json:"description_3"`

	Valueprogress1 string `json:"valueProgress1"`
	Valueprogress2 string `json:"valueProgress2"`
	Valueprogress3 string `json:"valueProgress3"`
	Valueprogress4 string `json:"valueProgress4"`
	Valueprogress5 string `json:"valueProgress5"`
	Valueprogress6 string `json:"valueProgress6"`
	Valueprogress7 string `json:"valueProgress7"`
	Valueprogress8 string `json:"valueProgress8"`

	Valuefollowup string `json:"valueFollowUp"`

	// ------ BILLER
	Invoiced        bool   `json:"invoiced"`
	InvoicedDate    string `json:"invoiced_date"`
	Biller          int    `json:"biller"`
	BillerFullName  string `json:"biller_full_name"`
	SignatureBILLER string `json:"-"`

	Invoiced2        bool   `json:"invoiced2"`
	InvoicedDate2    string `json:"invoiced_date2"`
	Biller2          int    `json:"biller2"`
	Biller2FullName  string `json:"biller2_full_name"`
	SignatureBILLER2 string `json:"-"`

	Invoiced3        bool   `json:"invoiced3"`
	InvoicedDate3    string `json:"invoiced_date3"`
	Biller3          int    `json:"biller3"`
	Biller3FullName  string `json:"biller3_full_name"`
	SignatureBILLER3 string `json:"-"`

	// --------FINANCE
	Paid             string `json:"paid"`
	PaidDate         string `json:"paid_date"`
	PaidUnits        int64  `json:"paidUnits"`
	Finance          int    `json:"finance"`
	FinanceFullName  string `json:"finance_full_name"`
	SignatureFinance string `json:"-"`

	Paid2             string `json:"paid2"`
	PaidDate2         string `json:"paid_date2"`
	PaidUnits2        int64  `json:"paidUnits2"`
	Finance2          int    `json:"finance2"`
	Finance2FullName  string `json:"finance2_full_name"`
	SignatureFinance2 string `json:"-"`

	Paid3             string `json:"paid3"`
	PaidDate3         string `json:"paid_date3"`
	PaidUnits3        int64  `json:"paidUnits3"`
	Finance3          int    `json:"finance3"`
	Finance3FullName  string `json:"finance3_full_name"`
	SignatureFinance3 string `json:"-"`
}

type FromAddNote struct {
	Notesadd struct {
		Tcm            int      `json:"tcm"`
		Scm            int      `json:"scm"`
		Weeks          int      `json:"weeks"`
		Insurance      int      `json:"insurance"`
		Date           string   `json:"date"`
		Billable       string   `json:"billable"`
		Minutes        int      `json:"minutes"`
		Units          int      `json:"units"`
		Timein         string   `json:"timeIn"`
		Timeout        string   `json:"timeOut"`
		Minutes1       int      `json:"minutes_1"`
		Location       string   `json:"location"`
		Opening        []string `json:"opening"`
		Sp             []string `json:"sp"`
		Addendums      []string `json:"addendums"`
		Sprfollowup    []string `json:"sprfollowup"`
		Spr            []string `json:"spr"`
		Closing        []string `json:"closing"`
		Description    string   `json:"description"`
		Timein2        string   `json:"timeIn_2"`
		Timeout2       string   `json:"timeOut_2"`
		Minutes2       int      `json:"minutes_2"`
		Location2      string   `json:"location_2"`
		Opening2       []string `json:"opening_2"`
		Sp2            []string `json:"sp_2"`
		Addendums2     []string `json:"addendums_2"`
		Sprfollowup2   []string `json:"sprfollowup_2"`
		Spr2           []string `json:"spr_2"`
		Closing2       []string `json:"closing_2"`
		Description2   string   `json:"description_2"`
		Timein3        string   `json:"timeIn_3"`
		Timeout3       string   `json:"timeOut_3"`
		Minutes3       int      `json:"minutes_3"`
		Location3      string   `json:"location_3"`
		Opening3       []string `json:"opening_3"`
		Sp3            []string `json:"sp_3"`
		Addendums3     []string `json:"addendums_3"`
		Sprfollowup3   []string `json:"sprfollowup_3"`
		Spr3           []string `json:"spr_3"`
		Closing3       []string `json:"closing_3"`
		Description3   string   `json:"description_3"`
		Valueprogress1 string   `json:"valueProgress1"`
		Valueprogress2 string   `json:"valueProgress2"`
		Valueprogress3 string   `json:"valueProgress3"`
		Valueprogress4 string   `json:"valueProgress4"`
		Valueprogress5 string   `json:"valueProgress5"`
		Valueprogress6 string   `json:"valueProgress6"`
		Valueprogress7 string   `json:"valueProgress7"`
		Valueprogress8 string   `json:"valueProgress8"`
		Valuefollowup  string   `json:"valueFollowUp"`
	} `json:"notesAdd"`
}
type FromEditNote struct {
	ID        int `json:"id"`
	NotesEdit struct {
		Tcm            int      `json:"tcm"`
		Scm            int      `json:"scm"`
		Weeks          int      `json:"weeks"`
		Date           string   `json:"date"`
		Billable       string   `json:"billable"`
		Minutes        int      `json:"minutes"`
		Units          int      `json:"units"`
		Timein         string   `json:"timeIn"`
		Timeout        string   `json:"timeOut"`
		Minutes1       int      `json:"minutes_1"`
		Location       string   `json:"location"`
		Opening        []string `json:"opening"`
		Sp             []string `json:"sp"`
		Addendums      []string `json:"addendums"`
		Sprfollowup    []string `json:"sprfollowup"`
		Spr            []string `json:"spr"`
		Closing        []string `json:"closing"`
		Description    string   `json:"description"`
		Timein2        string   `json:"timeIn_2"`
		Timeout2       string   `json:"timeOut_2"`
		Minutes2       int      `json:"minutes_2"`
		Location2      string   `json:"location_2"`
		Opening2       []string `json:"opening_2"`
		Sp2            []string `json:"sp_2"`
		Addendums2     []string `json:"addendums_2"`
		Sprfollowup2   []string `json:"sprfollowup_2"`
		Spr2           []string `json:"spr_2"`
		Closing2       []string `json:"closing_2"`
		Description2   string   `json:"description_2"`
		Timein3        string   `json:"timeIn_3"`
		Timeout3       string   `json:"timeOut_3"`
		Minutes3       int      `json:"minutes_3"`
		Location3      string   `json:"location_3"`
		Opening3       []string `json:"opening_3"`
		Sp3            []string `json:"sp_3"`
		Addendums3     []string `json:"addendums_3"`
		Sprfollowup3   []string `json:"sprfollowup_3"`
		Spr3           []string `json:"spr_3"`
		Closing3       []string `json:"closing_3"`
		Description3   string   `json:"description_3"`
		Valueprogress1 string   `json:"valueProgress1"`
		Valueprogress2 string   `json:"valueProgress2"`
		Valueprogress3 string   `json:"valueProgress3"`
		Valueprogress4 string   `json:"valueProgress4"`
		Valueprogress5 string   `json:"valueProgress5"`
		Valueprogress6 string   `json:"valueProgress6"`
		Valueprogress7 string   `json:"valueProgress7"`
		Valueprogress8 string   `json:"valueProgress8"`
		Valuefollowup  string   `json:"valueFollowUp"`
	} `json:"notesEdit"`
}
