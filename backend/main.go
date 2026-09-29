package main

import (
	"log"
	"net/http"

	"telemetry-backend/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()

	// Setup API routes
	r.HandleFunc("/api/telemetry", handlers.GetTelemetryData).Methods("GET")

	// Enable CORS for the Angular frontend
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // In production, restrict this to the frontend URL
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
	})

	handler := c.Handler(r)

	log.Println("Starting Telemetry Backend server on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
