import { Component } from '@angular/core';
import {WeatherService} from "../../../../../../shared/services/weather.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.scss'
})
export class DailyForecastComponent {
  protected currentWeather$ = this.weatherService.currentWeather$;
  protected dailyForecast$ = this.weatherService.dailyForecast$;
  protected activeDay: number = 0;

  constructor(private weatherService: WeatherService, private datePipe: DatePipe) { }

  protected getWeatherIcon(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }
  protected showTodayForecast(): void{
    const today: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss')||'';
    this.weatherService.getOneDayForecast(today);
    this.onDayClick(0);
  }
  protected showDailyForecast(date: string, index: number): void {
    this.weatherService.getOneDayForecast(date);
    this.onDayClick(index);
  }
  private onDayClick(index: number): void{
    this.activeDay = index;
  }
}
