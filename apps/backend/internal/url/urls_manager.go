package url

import (
	"context"
	"sharemail/internal/db"
	"sharemail/internal/orm"

	"github.com/jackc/pgx/v5"
)

func SyncUrls(urls *[]string) error {
	ctx := context.Background()

	ormConn, err := db.GetOrmConnection()
	if err != nil {
		return err
	}

	dbConn, err := db.GetSqlConnection()
	if err != nil {
		return err
	}

	tx, err := dbConn.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		tx.Rollback(ctx)
		return err
	}

	ormTx := ormConn.WithTx(tx)

	urlsData := orm.CreateUrlsParams{
		Path: *urls,
	}
	_, err = ormTx.CreateUrls(ctx, urlsData)
	if err != nil {
		tx.Rollback(ctx)
		return err
	}

	err = tx.Commit(ctx)
	if err != nil {
		tx.Rollback(ctx)
		return err
	}

	return nil
}
