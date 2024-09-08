package config

import (
	"path"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	filePath := path.Join(AppConfig["ROOT_PATH"], "/.env")
	err := godotenv.Load(filePath)
	if err != nil {
		panic(err)
	}
}
