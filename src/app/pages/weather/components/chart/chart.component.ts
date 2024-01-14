import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../../shared/services/weather.service";
import {Forecast} from "../../../../shared/interfaces/forecast.interface";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit{
  options = {
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Wind'
      }
    }
  }
  windSpeedData = {
    labels: ["14", "15", "16", "17", "18", "19", "20"],
    datasets: [
      {
        label: 'Wind speed',
        data: [1],
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.dailyForecast$.subscribe((forecast: any) => {
      this.windSpeedData = {
        ...this.windSpeedData,
        datasets: [
          {
            ...this.windSpeedData.datasets[0],
            data: this.extractWindSpeedData(forecast)
          }
        ]
      };
    });
  }

  private extractWindSpeedData(forecast: Forecast): number[] {
    console.log(forecast.list.map(item => item.wind.speed))
    return forecast.list.map(item => item.wind.speed);
  }
}
