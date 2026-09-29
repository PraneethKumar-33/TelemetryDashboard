# SLB Reservoir Telemetry Dashboard

A real-time telemetry dashboard designed for monitoring reservoir and rig sensors. This project demonstrates full-stack development using **GoLang (REST API)** and **Angular (Frontend)**.

## Tech Stack
*   **Backend:** Go (Golang) with Gorilla Mux for routing.
*   **Frontend:** Angular 17+ (Standalone Components).
*   **Methodologies:** REST API, Test-Driven Development (TDD).

## Setup & Running

### 1. Backend (Go)
1. Ensure Go is installed.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   go mod tidy
   ```
4. Run tests (TDD proof):
   ```bash
   go test ./handlers
   ```
5. Run the server:
   ```bash
   go run main.go
   ```
   *The backend will start on http://localhost:8080*

### 2. Frontend (Angular)
1. Ensure Node.js and npm are installed.
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm start
   ```
   *The dashboard will be available at http://localhost:4200*

## Features
*   **Real-time polling:** The frontend polls the backend every 3 seconds to update sensor data (Temperature, Pressure).
*   **Dynamic Status Mapping:** Visual indicators change color based on simulated critical thresholds.
*   **Scalable Architecture:** The Go backend is built for high-throughput sensor data ingestion.
