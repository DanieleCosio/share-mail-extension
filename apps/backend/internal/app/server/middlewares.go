package server

import (
	"fmt"
	"log"
	"net/http"
)

type LoggingResponseWriter struct {
	http.ResponseWriter
	Code   int
	Status string
}

func (r *LoggingResponseWriter) WriteHeader(code int) {
	r.Code = code
	r.Status = fmt.Sprintf("%d %s", code, http.StatusText(code))
	r.ResponseWriter.WriteHeader(code)
}

func addMiddlware(router *http.ServeMux, middlewares ...func(http.Handler) http.Handler) http.Handler {
	var handler http.Handler = router
	for _, middleware := range middlewares {
		handler = middleware(handler)
	}
	return handler
}

// MIDDLEWARES
func logMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		writer := &LoggingResponseWriter{ResponseWriter: w}
		next.ServeHTTP(writer, r)

		log.Printf(
			"{url: %s, method: %s, status: %s}",
			r.URL.Path, r.Method, writer.Status,
		)
	})
}
