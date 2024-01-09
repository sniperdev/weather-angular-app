import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
  ]
})
export class SharedModule { }
