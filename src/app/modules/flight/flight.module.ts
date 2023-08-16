import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightComponent } from './flight.component';
import { SharedModule } from '../shared/shared.module';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { ReservationModule } from '../reservation/reservation.module';


@NgModule({
  declarations: [
    FlightComponent,
    FlightDetailsComponent,
    FlightSearchComponent
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SharedModule,
    ReservationModule
  ],
  exports: [
    FlightComponent
  ]
})
export class FlightModule { }
