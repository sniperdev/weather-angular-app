import { Component } from '@angular/core';
import {WeatherService} from "../../../../shared/services/weather.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {
  protected currentWeather$ = this.weatherService.currentWeather$;
  protected forecast$ = this.weatherService.forecast$;
  protected dailyForecast$ = this.weatherService.dailyForecast$;

  protected getWeatherIcon(icon: string): string{
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  constructor(private weatherService: WeatherService) { }

}
