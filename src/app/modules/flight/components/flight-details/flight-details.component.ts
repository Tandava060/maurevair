import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Flight } from 'src/app/modules/core/models/flight/flight.model';
import { FlightService } from 'src/app/modules/core/services/flight.service';
import { NewReservationFormComponent } from 'src/app/modules/reservation/components/new-reservation-form/new-reservation-form.component';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {
  @Input() flight!: Flight;

  constructor(public dialog: MatDialog, public flightService: FlightService) { }

  openReservationForm(): void {
    this.dialog.open(NewReservationFormComponent, {
      data: this.flight,
      width: '500px',
      autoFocus: false
    })
  }
}
