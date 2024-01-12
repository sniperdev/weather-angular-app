import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Location} from "../interfaces/location.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private location: BehaviorSubject<Location> = new BehaviorSubject<Location>({} as Location);

  public get location$(){
    return this.location.asObservable();
  }

  constructor(private http: HttpClient ) { }

  public getLocation(city: string){
    return this.http.get<Location[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=b728d0936d84a2a6cd9e15eaa7169cee`)
      .subscribe((location: Location[]) => {
        this.location.next(location[0]);
      });
  }

  public getLocationByCoords(lat: number, lon: number){
    return this.http.get<Location[]>(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=b728d0936d84a2a6cd9e15eaa7169cee`)
      .subscribe((location: Location[]) => {
        this.location.next(location[0]);
      });
  }
}
