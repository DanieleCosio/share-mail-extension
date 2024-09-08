package models

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"sharemail/internal/orm"
)

type Email struct {
	orm.Email
	*orm.Url
	Attachment *[]orm.Attachment
}

func (email *Email) GenereteHash(attachments []Attachment) string {
	emailString := email.OwnerAddress + email.EmailHtml + email.EmailSubject
	for _, attattachment := range attachments {
		emailString = emailString + attattachment.Name + attattachment.MimeType + attattachment.Size
	}
	emailString = emailString + fmt.Sprint(len(attachments))
	hash := md5.Sum([]byte(emailString))

	email.EmailHash = hex.EncodeToString(hash[:])
	return email.EmailHash
}
