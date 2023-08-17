import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Flight } from '../models/flight/flight.model';
import { FlightApi } from '../models/flight/flight-api.model';
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
      tap(() => this.loadingService.show()),
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
      )),
      finalize(() => this.loadingService.stop())
    ).subscribe(
      flights => {
        this.flights$$.next(flights)
        this.loadingService.stop();
      }
    );
  }

  getAllFlights() {
    return this.airportService.getAirports().pipe(
      mergeMap(airports => this.http.get<FlightApi[]>(this.flightApiUrl).pipe(
        map(flights => flights.map(flight => {
          const originAirport = airports.find(airport => airport.id === flight.originId);
          const destinationAirport = airports.find(airport => airport.id === flight.destinationId);
          return {
            ...flight,
            origin: `${originAirport?.name}, ${originAirport?.city}, ${originAirport?.country}`,
            destination: `${destinationAirport?.name}, ${destinationAirport?.city}, ${destinationAirport?.country}`
          } as Flight;
        }))
      ))
    )
  }

  updateFlight(flight: Flight, seatId: number, noSeats: number) {
    const seatToUpdate = flight.seats.find(seat => seat.id === seatId);
    if (seatToUpdate) {
      seatToUpdate.available = seatToUpdate.available - noSeats;
    }
    return this.http.patch<Flight>(`${this.flightApiUrl}/${flight.id}`, { seats: flight.seats }).pipe(
      tap(() => this.loadingService.show()),
      catchError((err) => {
        if (seatToUpdate) {
          seatToUpdate.available = seatToUpdate.available + noSeats
        }
        return err;
      }),
      finalize(() => this.loadingService.stop())
    );
  }

  checkFlightAvailability(flight: Flight): boolean {
    return flight.seats.some(seat => seat.available > 0)
  }

}
