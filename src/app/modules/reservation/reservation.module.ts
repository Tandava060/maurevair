import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { NewReservationFormComponent } from './components/new-reservation-form/new-reservation-form.component';
import { SharedModule } from '../shared/shared.module';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';


@NgModule({
  declarations: [
    NewReservationFormComponent,
    UserReservationsComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule
  ],
  exports: [
    NewReservationFormComponent,
    UserReservationsComponent
  ],
  providers: [DatePipe],
})
export class ReservationModule { }
