package server

import (
	"sharemail/internal/app/models"
)

type GetEmailLinkBody struct {
	RequestAccountOwner string              `json:"requestAccountOwner"`
	Subject             string              `json:"subject"`
	MessageHtml         string              `json:"messageHtml"`
	Attachments         []models.Attachment `json:"attachments"`
}
