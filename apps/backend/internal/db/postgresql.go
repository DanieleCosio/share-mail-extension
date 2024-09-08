package db

import (
	"context"
	"fmt"
	"os"
	"sharemail/internal/orm"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func GetSqlConnection() (*pgxpool.Conn, error) {
	if pool == nil {
		poolConfig := getPoolConfig()
		tmp, err := pgxpool.NewWithConfig(context.Background(), poolConfig)
		pool = tmp
		if err != nil {
			return nil, err
		}
	}

	conn, err := pool.Acquire(context.Background())
	if err != nil {
		conn.Release()
		return nil, err
	}

	err = conn.Ping(context.Background())
	if err != nil {
		conn.Release()
		return nil, err
	}

	return conn, nil
}

func GetOrmConnection() (*orm.Queries, error) {
	sqlConn, err := GetSqlConnection()
	if err != nil {
		return nil, err
	}

	return orm.New(sqlConn), nil
}

func getPoolConfig() *pgxpool.Config {
	// Pool configuration, change these values to your needs
	const maxConns = 5
	const minConns = 1
	const maxConnLifetime = time.Hour
	const maxConnIdleTime = time.Minute * 30
	const healthCheckPeriod = time.Minute

	connStr := fmt.Sprintf(
		"dbname=%s host=%s port=%s sslmode=disable",
		os.Getenv("DB_NAME"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
	)

	if os.Getenv("DB_USER") != "" {
		connStr += fmt.Sprintf(" user=%s", os.Getenv("DB_USER"))
	}

	if os.Getenv("DB_PASSWORD") != "" {
		connStr += fmt.Sprintf(" password=%s", os.Getenv("DB_PASSWORD"))
	}

	poolConfig, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		panic(err)
	}

	poolConfig.MaxConns = maxConns
	poolConfig.MinConns = minConns
	poolConfig.MaxConnLifetime = maxConnLifetime
	poolConfig.MaxConnIdleTime = maxConnIdleTime
	poolConfig.HealthCheckPeriod = healthCheckPeriod

	return poolConfig
}
