import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';

const routes: Routes = [
  {
    path: '',
    component: UserReservationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
