import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherComponent} from "./weather.component";
import {WeatherRoutingModule} from "./weather-routing.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import { MainpageComponent } from './components/mainpage/mainpage.component';



@NgModule({
  declarations: [WeatherComponent, SidebarComponent, MainpageComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ChipsModule,
    FormsModule,
  ]
})
export class WeatherModule { }
