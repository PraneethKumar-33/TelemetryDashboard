import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

interface SensorData {
  id: string;
  rig_name: string;
  temperature: number;
  pressure: number;
  status: string;
  timestamp: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>SLB Reservoir Telemetry Dashboard</h1>
        <p>Real-time monitoring of rig sensors</p>
      </header>

      <div class="rig-grid">
        <div class="rig-card" *ngFor="let data of telemetryData" [ngClass]="data.status.toLowerCase()">
          <h2>{{ data.rig_name }}</h2>
          <div class="metric">
            <span class="label">Temperature:</span>
            <span class="value">{{ data.temperature | number:'1.1-2' }} &deg;C</span>
          </div>
          <div class="metric">
            <span class="label">Pressure:</span>
            <span class="value">{{ data.pressure | number:'1.0-0' }} PSI</span>
          </div>
          <div class="status-badge" [ngClass]="data.status.toLowerCase()">
            {{ data.status }}
          </div>
          <div class="timestamp">
            Updated: {{ data.timestamp | date:'mediumTime' }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: block;
      background-color: #f4f7f6;
      min-height: 100vh;
      padding: 2rem;
    }
    .dashboard-header {
      text-align: center;
      margin-bottom: 2rem;
      color: #0033a0; /* SLB Blue */
    }
    .rig-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .rig-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border-top: 5px solid #0033a0;
      transition: transform 0.2s;
    }
    .rig-card:hover {
      transform: translateY(-5px);
    }
    .rig-card.critical { border-top-color: #d32f2f; }
    .rig-card.warning { border-top-color: #f57c00; }
    .metric {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      font-size: 1.1rem;
    }
    .label { color: #666; }
    .value { font-weight: bold; color: #333; }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.85rem;
      font-weight: bold;
      margin-top: 15px;
      text-transform: uppercase;
    }
    .status-badge.normal { background: #e8f5e9; color: #2e7d32; }
    .status-badge.warning { background: #fff3e0; color: #f57c00; }
    .status-badge.critical { background: #ffebee; color: #d32f2f; }
    .timestamp {
      margin-top: 15px;
      font-size: 0.8rem;
      color: #999;
      text-align: right;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  telemetryData: SensorData[] = [];
  private pollingSubscription: Subscription | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    // Poll every 3 seconds for real-time updates
    this.pollingSubscription = interval(3000).subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.http.get<SensorData[]>('http://localhost:8080/api/telemetry')
      .subscribe({
        next: (data) => {
          this.telemetryData = data;
        },
        error: (err) => {
          console.error('Error fetching telemetry data', err);
        }
      });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
