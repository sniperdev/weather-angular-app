import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutingEnum} from "../../../utils/enums/app-routing.enum";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(private router: Router) { }
  protected navigateToHome(): void{
    this.router.navigate([AppRoutingEnum.home]);
  }
}
