import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Flight } from '../models/flight.model';
import { FlightApi } from '../models/flight-api.model';
import { AirportService } from './airport.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly flightApiUrl = 'api/flights';
  flights$$ = new BehaviorSubject<Flight[]>([]);
  flights$ = this.flights$$.asObservable();

  constructor(private readonly http: HttpClient, private readonly airportService: AirportService, private readonly loadingService: LoadingService) { }

  getFlights(originId: number, destinationId: number) {
    this.loadingService.show();
    this.airportService.getAirports().pipe(
      mergeMap(airports => this.http.get<FlightApi[]>(`${this.flightApiUrl}?originId=${originId}&destinationId=${destinationId}`).pipe(
        map(flights => flights.map(flight => {
          const originAirport = airports.find(airport => airport.id === flight.originId);
          const destinationAirport = airports.find(airport => airport.id === flight.destinationId);
          return {
            ...flight,
            origin: `${originAirport?.name}, ${originAirport?.city}, ${originAirport?.country}`,
            destination: `${destinationAirport?.name}, ${destinationAirport?.city}, ${destinationAirport?.country}`
          };
        }))
      ))
    ).subscribe(
      flights => {
        this.flights$$.next(flights)
        this.loadingService.stop();
      }
    );
  }

  updateFlight(flight: Flight, seatId: number, noSeats: number) {
    const seatToUpdate = flight.seats.find(seat => seat.id === seatId);
    if (seatToUpdate) {
      seatToUpdate.available = seatToUpdate.available - noSeats;
    }
    return this.http.patch<Flight>(`${this.flightApiUrl}/${flight.id}`, { seats: flight.seats }).pipe(
      catchError((err) => {
        if (seatToUpdate) {
          seatToUpdate.available = seatToUpdate.available + noSeats
        }
        return err;
      }));
  }
}
