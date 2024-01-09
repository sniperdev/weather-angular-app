import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutingEnum} from "./utils/enums/app-routing.enum";

const routes: Routes = [
  {
    path: AppRoutingEnum.home,
    redirectTo: AppRoutingEnum.weather,
    pathMatch: 'full'
  },
  {
    path: AppRoutingEnum.weather,
    loadChildren: () => import('./pages/weather/weather.module').then(m => m.WeatherModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
