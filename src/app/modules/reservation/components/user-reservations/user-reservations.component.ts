import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/modules/core/models/reservations/reservation.model';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent {
  reservations$: Observable<Reservation[]> = this.reservationService.getUserReservation();

  constructor(private reservationService: ReservationService) { }

}
