import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {registerLocaleData} from "@angular/common";
import localePl from '@angular/common/locales/pl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";

registerLocaleData(localePl)
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
