import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Airport } from 'src/app/modules/core/models/airport.model';
import { AirportService } from 'src/app/modules/core/services/airport.service';
import { FlightService } from 'src/app/modules/core/services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  flightSearchForm = this.fb.group({
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    searchOrigin: [''],
    searchDestination: [''],
  })

  @Output() searchedFlights = new EventEmitter();
  airports$ = this.airportService.getAirports();
  origin$!: Observable<Airport[]>;
  destination$!: Observable<Airport[]>;

  constructor(private fb: FormBuilder, private airportService: AirportService, private flightService: FlightService) {}

  ngOnInit(): void {
    this.origin$ = this.createFilteredAirportsObservable('searchOrigin', 'destination');
    this.destination$ = this.createFilteredAirportsObservable('searchDestination', 'origin');
  }

  createFilteredAirportsObservable(searchControl: string, oppositeControl: string) {
    return combineLatest([
      this.airports$,
      this.flightSearchForm.get(searchControl)!.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        map(search => search!.toLowerCase())
      ),
      this.flightSearchForm.get(oppositeControl)!.valueChanges.pipe(
        startWith(''),
      )
    ]).pipe(
      map(([airports, searchTerm, oppositeAirport]) => this.filterAirports(searchTerm, airports, oppositeAirport.country)
      )
    );
  }

  searchFlights() {
    if (this.flightSearchForm.valid) {
      console.log(this.flightSearchForm.value);
      const originId = (this.flightSearchForm.value.origin as unknown as Airport).id;
      const destinationId = (this.flightSearchForm.value.destination as unknown as Airport).id;
      this.flightService.getFlights(originId, destinationId);
      this.searchedFlights.emit();
    }
  }

  private filterAirports(searchTerm: string, airports: Airport[], oppositeCountry: string): Airport[] {
    return airports.filter(airport => airport.country.toLowerCase().includes(searchTerm) && airport.country !== oppositeCountry);
  }
}