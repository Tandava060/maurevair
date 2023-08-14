import { Component } from '@angular/core';
import { Flight } from '../core/models/flight.model';
import { FlightService } from '../core/services/flight.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../core/services/loading.service';

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

  constructor(public flightService: FlightService, public loadingService: LoadingService) { }
}
