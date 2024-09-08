package models

type Attachment struct {
	Name       string `json:"name"`
	Url        string `json:"url"`
	PreviewUrl string `json:"preview"`
	Size       string `json:"size"`
	MimeType   string `json:"mimeType"`
}
