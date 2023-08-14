import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Flight } from 'src/app/modules/core/models/flight.model';
import { NewReservationFormComponent } from 'src/app/modules/reservation/new-reservation-form/new-reservation-form.component';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {
  @Input() flight!: Flight;

  constructor(public dialog: MatDialog) { }

  openReservationForm(): void {
    this.dialog.open(NewReservationFormComponent, {
      data: this.flight,
      width: '500px',
      autoFocus: false
    })
  }
}
