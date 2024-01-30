import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../../shared/services/weather.service";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit{
  @Input() item!: string;

  options = {
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: this.item,
      }
    }
  }
  data = {
    labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00","18:00", "21:00"],
    datasets: [
      {
        label: this.item,
        data: [1],
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.oneDayForecast$.subscribe((forecast: any) => {
      const days = forecast.map((item: any) => item.dt_txt.split(' ')[1].slice(0,5));
      this.data = {
        ...this.data,
        labels: days,
        datasets: [
          {
            ...this.data.datasets[0],
            data: this.extractData(forecast)
          }
        ]
      };
    });
  }

  private extractData(forecast: any){
    switch (this.item) {
      case 'Wind speed':
        return this.extractWindSpeedData(forecast);
      case 'Temperature':
        return this.extractTemperatureData(forecast);
      case 'Humidity':
        return this.extractHumidityData(forecast);
      case 'Pressure':
        return this.extractPressureData(forecast);
      default:
        return [];
    }
  }

  private extractWindSpeedData(forecast: any): number[] {
    return forecast.map((item:any) => item.wind.speed);
  }
  private extractTemperatureData(forecast: any): number[] {
    return forecast.map((item:any) => item.main.temp);
  }
  private extractHumidityData(forecast: any): number[] {
    return forecast.map((item:any) => item.main.humidity);
  }
  private extractPressureData(forecast: any): number[] {
    return forecast.map((item:any) => item.main.pressure);
  }
}
