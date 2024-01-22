import {Component, OnInit} from '@angular/core';
import {LocationService} from "./shared/services/location.service";
import {WeatherService} from "./shared/services/weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor( private locationService: LocationService, private weatherService: WeatherService ) { }

  ngOnInit(): void {
    this.locationService.location$.subscribe(location => {
      if(!location.lat && !location.lon) return;
      this.weatherService.getCurrentWeather(location.lat, location.lon);
      this.weatherService.getForecast(location.lat, location.lon);
    });
  }
}
