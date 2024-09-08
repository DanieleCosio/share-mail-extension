package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sharemail/internal/app/models"
	"sharemail/internal/config"
	"sharemail/internal/db"
	"sharemail/internal/orm"

	"github.com/jackc/pgx/v5"
)

func getEmailLink(w http.ResponseWriter, r *http.Request) {
	if r.Method != POST.String() {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var messageData GetEmailLinkBody
	err := json.NewDecoder(r.Body).Decode(&messageData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		Logger().Error().Err(err).Msg("Failed to decode request body")
		return
	}

	if messageData.RequestAccountOwner == "" || messageData.MessageHtml == "" {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	log.Printf("RequestAccountOwner: %s\n", messageData.RequestAccountOwner)
	log.Printf("MessageHtml: %s\n", messageData.MessageHtml)

	ctx := context.Background()

	sqlOrm, err := db.GetOrmConnection()
	if err != nil {
		Logger().Error().Err(err).Msg("Failed to get ORM connection")
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	email := models.Email{
		Email: orm.Email{
			OwnerAddress: messageData.RequestAccountOwner,
			EmailSubject: messageData.Subject,
			EmailHtml:    messageData.MessageHtml,
		},
	}

	email.GenereteHash(messageData.Attachments)

	savedEmail, err := sqlOrm.GetEmailByHash(ctx, email.EmailHash)
	emailExist := true
	if err != nil {
		if err == pgx.ErrNoRows {
			emailExist = false
		} else {
			Logger().Error().Err(err).Msg("sqlOrm.GetEmailByHash error")
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
	}

	var url orm.Url
	if !emailExist {
		savedEmail, err = sqlOrm.CreateEmail(ctx, orm.CreateEmailParams{
			OwnerAddress: messageData.RequestAccountOwner,
			EmailSubject: messageData.Subject,
			EmailHtml:    messageData.MessageHtml,
			EmailHash:    email.Email.EmailHash,
		})

		if err != nil {
			Logger().Error().Err(err).Msg("sqlOrm.GetEmailByHash error")
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		for _, attachment := range messageData.Attachments {
			_, err := sqlOrm.CreateAttachment(ctx, orm.CreateAttachmentParams{
				EmailID:       savedEmail.ID,
				Name:          attachment.Name,
				MimeType:      attachment.MimeType,
				Size:          attachment.Size,
				AttachmentUrl: attachment.Url,
				PreviewUrl:    &attachment.PreviewUrl,
			})

			if err != nil {
				Logger().Error().Err(err).Msg("Failed to create attachment")
				http.Error(w, "Internal server error", http.StatusInternalServerError)
				return
			}
		}

		url, err := sqlOrm.GetFreeUrl(ctx)
		if err != nil {
			Logger().Error().Err(err).Msg("orm.GetFreeUrl error")
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		useUrlParams := orm.UseUrlParams{
			EmailID: &savedEmail.ID,
			UrlID:   url.ID,
		}
		_, err = sqlOrm.UseUrl(ctx, useUrlParams)
		if err != nil {
			Logger().Error().Err(err).Msg("orm.UseUrl error")
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

	} else {
		url, err = sqlOrm.GetUrlFromEmailId(ctx, &savedEmail.ID)
		if err != nil {
			Logger().Error().Err(err).Msg("orm.GetUrlFromEmailId error")
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
	}

	sqlOrm = nil

	expirationDate := email.Email.CreatedAt.Time.AddDate(0, 0, 2)
	jsonResponse := GetEmailLinkResponse{
		Url: fmt.Sprintf(
			"%s/%s/%s",
			config.AppConfig["BASE_URL"],
			config.AppConfig["EMAILS_LINKS_PREFIX"],
			url.Path,
		),
		Password: savedEmail.EmailHash[0:8],
		ExpireAt: expirationDate.Format("2006-01-02 15:04:05"),
	}
	jsonResponse.Dispatch(&w, jsonResponse)
}

func showEmail(w http.ResponseWriter, r *http.Request) {

}

func ping(w http.ResponseWriter, r *http.Request) {
	jsonResponse := PingResponse{Success: true}
	jsonResponse.Dispatch(&w, jsonResponse)
}
