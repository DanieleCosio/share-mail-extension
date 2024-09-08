package server

import (
	"os"
	"path"
	"sharemail/internal/config"

	"github.com/rs/zerolog"
)

var logger *zerolog.Logger

func Logger() *zerolog.Logger {
	if logger != nil {
		return logger
	}

	logsFilePath := path.Join(config.AppConfig["ROOT_PATH"], "/server.log")
	logFile, err := os.OpenFile(logsFilePath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		panic(err)
	}

	multiWriter := zerolog.MultiLevelWriter(zerolog.ConsoleWriter{Out: os.Stdout}, logFile)
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	l := zerolog.New(multiWriter).With().Timestamp().Logger()
	logger = &l

	return logger

}
