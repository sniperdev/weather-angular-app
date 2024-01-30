import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Weather} from "../interfaces/weather.interface";
import {HttpClient} from "@angular/common/http";
import {Forecast} from "../interfaces/forecast.interface";
import {DailyForecast} from "../interfaces/dailyForecast.interface";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private currentWeather: BehaviorSubject<Weather | null> = new BehaviorSubject<Weather | null>(null);
  private forecast: BehaviorSubject<Forecast | null> = new BehaviorSubject<Forecast | null>(null);
  private dailyForecast: BehaviorSubject<DailyForecast[]> = new BehaviorSubject<DailyForecast[]>([]);
  private oneDayForecast: BehaviorSubject<DailyForecast[]|undefined> = new BehaviorSubject<DailyForecast[]|undefined>([]);

  public get currentWeather$(){
    return this.currentWeather.asObservable();
  }

  public get forecast$(){
    return this.forecast.asObservable();
  }

  public get dailyForecast$(){
    return this.dailyForecast.asObservable();
  }

  public get oneDayForecast$(){
    return this.oneDayForecast.asObservable();
  }

  constructor(private http: HttpClient) { }

  public getCurrentWeather(lat: number, lon: number){
    return this.http.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b728d0936d84a2a6cd9e15eaa7169cee&units=metric`)
      .subscribe((weather: Weather) => {
        this.currentWeather.next(weather);
      });
  }

  public getForecast(lat: number, lon: number){
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b728d0936d84a2a6cd9e15eaa7169cee&units=metric`)
      .subscribe((forecast: Forecast) => {
        this.forecast.next(forecast);
        const dailyForecast = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));
        this.dailyForecast.next(dailyForecast);
      });
  }

  public getOneDayForecast(date: string){
    const forecast = this.forecast.getValue();
    const onlyDay = date.split(' ')[0];
    const oneDayForecasts = forecast?.list.filter(item => item.dt_txt.includes(onlyDay));
    this.oneDayForecast.next(oneDayForecasts);
  }
}
