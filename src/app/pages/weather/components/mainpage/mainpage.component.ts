import { Component } from '@angular/core';
import {WeatherService} from "../../../../shared/services/weather.service";
import {Weather} from "../../../../shared/interfaces/weather.interface";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {
  protected currentWeather$ = this.weatherService.currentWeather$;

  protected getWeatherIcon(weather: Weather | null){
    if(weather) return `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    return '';
  }

  constructor(private weatherService: WeatherService) { }

}
