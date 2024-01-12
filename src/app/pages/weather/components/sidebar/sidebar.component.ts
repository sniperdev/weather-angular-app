import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../../../shared/services/location.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  protected currentTime!: Date;
  protected value!: string;
  protected location$ = this.locationService.location$;

  constructor(private locationService: LocationService) { }

  protected getCurrentLocation(){
    this.locationService.getLocation(this.value);
  }

  private updateTime(){
    this.currentTime = new Date();
  }

  ngOnInit(){
    this.updateTime();
    setInterval(()=> this.updateTime(), 60000);

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.locationService.getLocationByCoords(position.coords.latitude, position.coords.longitude);
      })
    }
  }
}
