import { Injectable } from '@angular/core';
import {BehaviorSubject, take} from "rxjs";
import {Weather} from "../interfaces/weather.interface";
import {HttpClient} from "@angular/common/http";
import {LocationService} from "./location.service";
import {Forecast} from "../interfaces/forecast.interface";
import {DailyForecast} from "../interfaces/dailyForecast.interface";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private currentWeather: BehaviorSubject<Weather> = new BehaviorSubject<Weather>({} as Weather);
  private forecast: BehaviorSubject<Forecast> = new BehaviorSubject<Forecast>({} as Forecast);
  private dailyForecast: BehaviorSubject<DailyForecast[]> = new BehaviorSubject<DailyForecast[]>([] as DailyForecast[]);

  public get currentWeather$(){
    return this.currentWeather.asObservable();
  }

  public get forecast$(){
    return this.forecast.asObservable();
  }

  public get dailyForecast$(){
    return this.dailyForecast.asObservable();
  }

  constructor(private http: HttpClient, private locationService: LocationService) {
    this.locationService.location$.subscribe(location => {
      this.getCurrentWeather(location.lat, location.lon);
      this.getForecast(location.lat, location.lon);
    });
  }

  private getCurrentWeather(lat: number, lon: number){
    return this.http.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b728d0936d84a2a6cd9e15eaa7169cee&units=metric`)
      .subscribe((weather: Weather) => {
        this.currentWeather.next(weather);
      });
  }

  private getForecast(lat: number, lon: number){
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b728d0936d84a2a6cd9e15eaa7169cee&units=metric`)
      .subscribe((forecast: Forecast) => {
        this.forecast.next(forecast);

        const dailyForecast = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));
        this.dailyForecast.next(dailyForecast);
      });
  }
}
