package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"telemetry-backend/models"
)

// GenerateMockData simulates incoming telemetry from various rigs
func GenerateMockData() []models.SensorData {
	rigs := []string{"Rig-Alpha", "Rig-Beta", "Rig-Gamma"}
	var data []models.SensorData

	for _, rig := range rigs {
		temp := 60.0 + rand.Float64()*40.0 // 60 to 100 C
		pressure := 3000.0 + rand.Float64()*2000.0 // 3000 to 5000 PSI
		
		status := "NORMAL"
		if temp > 90 || pressure > 4500 {
			status = "CRITICAL"
		} else if temp > 80 || pressure > 4000 {
			status = "WARNING"
		}

		data = append(data, models.SensorData{
			ID:          rig + "-" + time.Now().Format("150405"),
			RigName:     rig,
			Temperature: temp,
			Pressure:    pressure,
			Status:      status,
			Timestamp:   time.Now(),
		})
	}
	return data
}

// GetTelemetryData handles the GET request for telemetry
func GetTelemetryData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	data := GenerateMockData()
	
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
