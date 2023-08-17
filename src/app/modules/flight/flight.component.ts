import { Component } from '@angular/core';
import { FlightService } from '../core/services/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent {
  initialLoad: boolean = true;

  onSearch() {
    this.initialLoad = false;
  }

  constructor(public flightService: FlightService) { }
}
