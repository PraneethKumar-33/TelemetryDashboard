package models

import "time"

// SensorData represents telemetry data from a reservoir rig
type SensorData struct {
	ID          string    `json:"id"`
	RigName     string    `json:"rig_name"`
	Temperature float64   `json:"temperature"` // in Celsius
	Pressure    float64   `json:"pressure"`    // in PSI
	Status      string    `json:"status"`      // "NORMAL", "WARNING", "CRITICAL"
	Timestamp   time.Time `json:"timestamp"`
}
