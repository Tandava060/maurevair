import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { UserReservationsComponent } from './modules/reservation/components/user-reservations/user-reservations.component';
import { FlightComponent } from './modules/flight/flight.component';
import { IsAuthenticatedGuard } from './modules/core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'flights',
    component: FlightComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'reservations',
    component: UserReservationsComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: '/flights',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
