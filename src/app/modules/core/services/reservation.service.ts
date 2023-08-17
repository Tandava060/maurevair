import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map, mergeMap, tap } from 'rxjs';
import { NewReservation } from '../../reservation/models/new-reservation.model';
import { ReservationApi } from '../models/reservations/reservation-api.model';
import { Reservation } from '../models/reservations/reservation.model';
import { FlightService } from './flight.service';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationUrl = 'api/reservations';

  constructor(private http: HttpClient, private flightService: FlightService, private authService: AuthService, private loadingService: LoadingService) { }

  makeReservation(newreservation: NewReservation): Observable<ReservationApi> {
    return this.http.post<ReservationApi>(this.reservationUrl, newreservation).pipe(
      tap(() => this.loadingService.show()),
      finalize(() => this.loadingService.stop())
    );
  }

  getUserReservation(): Observable<Reservation[]> {
    const userId = this.authService.currentUserValue.user.id;
    return this.flightService.getAllFlights().pipe(
      tap(() => this.loadingService.show()),
      mergeMap(flights => this.http.get<ReservationApi[]>(`${this.reservationUrl}?userId=${userId}`).pipe(
        map(reservations => reservations.map(reservation => {
          const flight = flights.find(flight => flight.id === reservation.flightId);
          return {
            flight,
            ...reservation
          } as Reservation;
        }))
      )),
      finalize(() => this.loadingService.stop())
    );
  }
}
