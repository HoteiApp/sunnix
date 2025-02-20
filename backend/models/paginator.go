package models

type Pagination struct {
	Limit      int         `json:"limit,omitempty,query:limit"`
	Page       int         `json:"page,omitempty;query:page"`
	Sort       string      `json:"sort,omitempty;query:sort"`
	TotalItems int64       `json:"totalItems"`
	TotalPages int         `json:"totalPages"`
	HasPrev    bool        `json:"hasPrev"`
	HasNext    bool        `json:"hasNext"`
	Items      interface{} `json:"items"`
	PrevURL    string      `json:"prevURL,omitempty"`
	NextURL    string      `json:"nextURL,omitempty"`
}
