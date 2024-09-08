package config

import (
	"os"
	"path/filepath"
)

func getRootPath() string {
	currentDir, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	for {
		goModPath := filepath.Join(currentDir, "go.mod")
		if _, err := os.Stat(goModPath); err == nil {
			return currentDir
		}

		parentDir := filepath.Dir(currentDir)
		if parentDir == currentDir {
			panic("go.mod file not found")
		}
		currentDir = parentDir
	}
}

// CONFIG: Application configuration, modify as needed
var AppConfig = map[string]string{
	"ROOT_PATH":           getRootPath(),
	"BASE_URL":            "http://localhost:5500",
	"EMAILS_LINKS_PREFIX": "share",
}
