import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {LocationService} from "./shared/services/location.service";
import {WeatherService} from "./shared/services/weather.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private today: string;

  constructor( private locationService: LocationService, private weatherService: WeatherService, private datePipe: DatePipe) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')||'';
  }


  ngOnInit(): void {
    this.locationService.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe(location => {
        if(!location.lat && !location.lon) return;
        this.weatherService.getCurrentWeather(location.lat, location.lon);

        this.weatherService.getForecast(location.lat, location.lon)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.weatherService.getOneDayForecast(this.today);
          });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
