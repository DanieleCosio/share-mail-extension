package models

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
)

type Email struct {
	OwnerAddress string
	EmailSubject string
	EmailHtml    string
	EmailHash    string
	*Url
	Attachments *[]Attachment
}

func (email *Email) GenereteHash() string {
	emailString := email.OwnerAddress + email.EmailHtml + email.EmailSubject
	for _, attattachment := range *email.Attachments {
		emailString = emailString + attattachment.Name + attattachment.MimeType + attattachment.Size
	}
	emailString = emailString + fmt.Sprint(len(*email.Attachments))
	hash := md5.Sum([]byte(emailString))

	email.EmailHash = hex.EncodeToString(hash[:])
	return email.EmailHash
}
