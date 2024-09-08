package server

import (
	"backend/internal/app/components/templates/demo"
	"backend/internal/config"
	"log"
	"net/http"
	"os"
	"path"

	"github.com/a-h/templ"
	/* "backend/internal/server/components" */)

func Start() {
	// Load environment variables from .env file
	staticFilesPath := path.Join(config.AppConfig["ROOT_PATH"], "/web/static/")
	config.LoadEnv()

	port := os.Getenv("APP_PORT")
	component := demo.Demo()

	// Routes
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/ping", ping)
	mux.HandleFunc("/api/v1/email/link", getEmailLink)
	mux.HandleFunc("/emails/:email_hash", showEmail)
	mux.Handle(
		"/assets/",
		http.StripPrefix("/assets/", http.FileServer(http.Dir(staticFilesPath))),
	)
	mux.Handle("/tests/component", templ.Handler(component))

	// Middlewares
	handler := addMiddlware(mux, logMiddleware)

	log.Printf("Server listening on port %s", port)
	err := http.ListenAndServe("localhost:"+port, handler)
	if err != nil {
		panic(err)
	}
}
