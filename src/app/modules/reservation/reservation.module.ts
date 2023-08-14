import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { NewReservationFormComponent } from './new-reservation-form/new-reservation-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NewReservationFormComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule
  ],
  exports: [
    NewReservationFormComponent
  ],
  providers: [DatePipe],
})
export class ReservationModule { }
