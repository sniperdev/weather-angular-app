import {Component, OnInit} from '@angular/core';
import {LocationService} from "./shared/services/location.service";
import {WeatherService} from "./shared/services/weather.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private today: string;

  constructor( private locationService: LocationService, private weatherService: WeatherService, private datePipe: DatePipe) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||'';
  }

  ngOnInit(): void {
    this.locationService.location$.subscribe(location => {
      if(!location.lat && !location.lon) return;
      this.weatherService.getCurrentWeather(location.lat, location.lon);
      this.weatherService.getForecast(location.lat, location.lon).subscribe(
        () => {
          this.weatherService.getOneDayForecast(this.today);
        }
      );
    });
  }
}
