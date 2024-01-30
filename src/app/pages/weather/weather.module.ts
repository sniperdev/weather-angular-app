import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherComponent} from "./weather.component";
import {WeatherRoutingModule} from "./weather-routing.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ChartComponent } from './components/chart/chart.component';
import {ChartModule} from "primeng/chart";
import { DailyForecastComponent } from './components/mainpage/components/daily-forecast/daily-forecast.component';



@NgModule({
  declarations: [WeatherComponent, SidebarComponent, MainpageComponent, ChartComponent, DailyForecastComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ChipsModule,
    FormsModule,
    ChartModule,
  ]
})
export class WeatherModule { }
