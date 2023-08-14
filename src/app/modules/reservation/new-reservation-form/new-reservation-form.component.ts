import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Flight } from '../../core/models/flight.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NewReservation } from '../models/new-reservation.model';
import { ReservationService } from '../../core/services/reservation.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-reservation-form',
  templateUrl: './new-reservation-form.component.html',
  styleUrls: ['./new-reservation-form.component.scss']
})
export class NewReservationFormComponent implements OnInit {

  reservationForm = this.fb.group({
    flightNo: [{value: '', disabled: true}],
    flightOrigin: [{value: '', disabled: true}],
    flightDestination: [{value: '', disabled: true}],
    time: [{value: '', disabled: true}],
    seatType: ['', Validators.required],
    noOfSeats: ['',  [Validators.required, this.validateNoOfSeats.bind(this)]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public flight: Flight, private fb: FormBuilder, private datePipe: DatePipe, private reservationService: ReservationService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const arrival = this.datePipe.transform(this.flight.arrivalTime, 'yyyy-MM-dd HH:mm');
    const departure = this.datePipe.transform(this.flight.departureTime, 'yyyy-MM-dd HH:mm');
    this.reservationForm.patchValue({
      flightNo: this.flight.flightNo,
      flightOrigin: this.flight.origin,
      flightDestination: this.flight.destination,
      time: `${arrival} - ${departure}`
    });
  }

  onSubmit(): void {
    if(this.reservationForm.valid) {
      const reservation: NewReservation = {
        flightId: this.flight.id,
        seatId: Number(this.reservationForm.value.seatType),
        noOfSeats: Number(this.reservationForm.value.noOfSeats),
        userId: 1
      }
      const snackbarConfig: MatSnackBarConfig =  {
        duration: 3000, 
        verticalPosition: 'top', 
        horizontalPosition: 'right'
      }
      
      this.reservationService.makeReservation(reservation).subscribe({
        next: () => this.snackBar.open('Reservation successful', 'Close', snackbarConfig),
        error: () => this.snackBar.open('Reservation failed', 'Close', snackbarConfig)
      });
    }
  }

  public hasError(controlName: string, errorName: string): boolean | undefined{
    return this.reservationForm.get(controlName)?.touched && this.reservationForm.get(controlName)?.hasError(errorName);
  }

  private validateNoOfSeats(control: FormControl): ValidationErrors | undefined {
    if (!this.reservationForm || !this.reservationForm.controls) {
      return;
    }

    const seatType = this.reservationForm.controls.seatType.value;
    
    if (!seatType) {
      return;
    }

    const noOfSeats = control.value;
    const maxSeats = this.flight.seats.find(b => b.id === Number(seatType))?.available;
    if (maxSeats && noOfSeats > maxSeats) {
      return  {'max': true}
    }

    return;
  }
}

