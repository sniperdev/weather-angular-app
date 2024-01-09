import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherComponent} from "./weather.component";
import {WeatherRoutingModule} from "./weather-routing.module";



@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
