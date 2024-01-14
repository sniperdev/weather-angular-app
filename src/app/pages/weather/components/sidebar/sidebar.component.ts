import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../../../shared/services/location.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  protected currentTime!: Date;
  protected inputValue!: string;
  protected location$ = this.locationService.location$;

  constructor(private locationService: LocationService) { }

  protected getCurrentLocation(){
    this.locationService.getLocation(this.inputValue);
  }

  private updateTime(){
    this.currentTime = new Date();
  }

  ngOnInit(){
    this.updateTime();
    setInterval(()=> this.updateTime(), 60000);
  }
}
