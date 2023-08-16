import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap } from 'rxjs';
import { NewReservation } from '../../reservation/models/new-reservation.model';
import { ReservationApi } from '../models/reservations/reservation-api.model';
import { Reservation } from '../models/reservations/reservation.model';
import { FlightService } from './flight.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationUrl = 'api/reservations';

  constructor(private http: HttpClient, private flightService: FlightService, private authService: AuthService) { }

  makeReservation(newreservation: NewReservation): Observable<ReservationApi> {
    return this.http.post<ReservationApi>(this.reservationUrl, newreservation);
  }

  getUserReservation(): Observable<Reservation[]> {
    const userId = this.authService.currentUserValue.user.id;
    return this.flightService.getAllFlights().pipe(
      mergeMap(flights => this.http.get<ReservationApi[]>(`${this.reservationUrl}?userId=${userId}`).pipe(
        map(reservations => reservations.map(reservation => {
          const flight = flights.find(flight => flight.id === reservation.flightId);
          return {
            flight,
            ...reservation
          } as Reservation;
        }))
      ))
    );
  }
}
