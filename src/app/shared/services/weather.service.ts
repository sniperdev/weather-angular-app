import { Injectable } from '@angular/core';
import {BehaviorSubject, take} from "rxjs";
import {Weather} from "../interfaces/weather.interface";
import {HttpClient} from "@angular/common/http";
import {LocationService} from "./location.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  protected currentWeather: BehaviorSubject<Weather> = new BehaviorSubject<Weather>({} as Weather);

  public get currentWeather$(){
    return this.currentWeather.asObservable();
  }

  constructor(private http: HttpClient, private locationService: LocationService) {
    this.locationService.location$.subscribe(location => {
      this.getCurrentWeather(location.lat, location.lon);
    });
  }

  private getCurrentWeather(lat: number, lon: number){
    return this.http.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b728d0936d84a2a6cd9e15eaa7169cee&units=metric`)
      .subscribe((weather: Weather) => {
        this.currentWeather.next(weather);
      });
  }
}
