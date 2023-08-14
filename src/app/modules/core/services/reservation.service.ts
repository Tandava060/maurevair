import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewReservation } from '../../reservation/models/new-reservation.model';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationUrl = 'api/reservations';

  constructor(private http: HttpClient) {}

  makeReservation(newreservation: NewReservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationUrl, newreservation);
  }
}
