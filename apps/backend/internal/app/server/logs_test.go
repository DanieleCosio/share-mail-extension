package server

import (
	"errors"
	"os"
	"path"
	"sharemail/internal/config"
	"testing"
)

func TestLogger(t *testing.T) {
	logger := Logger()
	if logger == nil {
		t.Errorf("Expected logger to be a pointer, got %v", logger)
	}

	logger.Err(nil).Msg("Test message")

	logsFilePath := path.Join(config.AppConfig["ROOT_PATH"], "/server.log")
	if _, err := os.Stat(logsFilePath); errors.Is(err, os.ErrNotExist) {
		t.Errorf("Expected log file to exist at %s, got %v", logsFilePath, err)
	}

}
