package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"telemetry-backend/models"
)

func TestGetTelemetryData(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/telemetry", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetTelemetryData)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var data []models.SensorData
	err = json.Unmarshal(rr.Body.Bytes(), &data)
	if err != nil {
		t.Fatalf("could not parse response JSON: %v", err)
	}

	if len(data) == 0 {
		t.Errorf("expected telemetry data, got empty array")
	}

	// TDD: Check if all rigs are present
	rigsFound := make(map[string]bool)
	for _, sensor := range data {
		rigsFound[sensor.RigName] = true
	}

	if !rigsFound["Rig-Alpha"] || !rigsFound["Rig-Beta"] || !rigsFound["Rig-Gamma"] {
		t.Errorf("missing one or more expected rigs in mock data")
	}
}
