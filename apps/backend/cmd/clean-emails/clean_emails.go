package main

import (
	"context"
	"fmt"
	"sharemail/internal/db"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func main() {
	ctx := context.Background()
	expirationDate := pgtype.Timestamp{Time: time.Now().Add(-48 * time.Hour)}

	ormConn, err := db.GetOrmConnection()
	if err != nil {
		panic(err)
	}

	emails, err := ormConn.LRListEmailsByDate(ctx, expirationDate)
	if err != nil {
		panic(err)
	}

	emailsIds := make([]int32, len(emails))
	urlsIds := make([]int32, len(emails))
	for idx, email := range emails {
		emailsIds[idx] = email.Email.ID
		urlsIds[idx] = email.Url.ID
	}

	ormConn.DeleteEmails(ctx, emailsIds)
	ormConn.FreeUrls(ctx, urlsIds)

	fmt.Printf("Emails removed: %d", len(urlsIds))
}
