import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewReservationFormComponent } from './new-reservation-form.component';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { FlightService } from '../../../core/services/flight.service';
import { of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

describe('NewReservationFormComponent', () => {
  let component: NewReservationFormComponent;
  let fixture: ComponentFixture<NewReservationFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<NewReservationFormComponent>>;
  let mockReservationService: jasmine.SpyObj<ReservationService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSnackbarService: jasmine.SpyObj<SnackbarService>;
  let mockFlightService: jasmine.SpyObj<FlightService>;

  const mockFlightData = {
    flightNo: 'AB123',
    origin: 'OriginCity',
    destination: 'DestinationCity',
    arrivalTime: new Date().toISOString(),
    departureTime: new Date().toISOString(),
    seats: [
      { id: 1, class: 'Economy', available: 5 },
      { id: 2, class: 'Business', available: 3 }
    ]
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockReservationService = jasmine.createSpyObj('ReservationService', ['makeReservation']);
    mockReservationService.makeReservation.and.returnValue(of({
      id: 1,
      flightId: 1,
      seatId: 1,
      userId: 1,
      noOfSeats: 1
    }));
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      currentUserValue: { user: { id: 1 } }
    });
    mockSnackbarService = jasmine.createSpyObj('SnackbarService', ['show']);
    mockFlightService = jasmine.createSpyObj('FlightService', ['updateFlight']);
    mockFlightService.updateFlight.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [NewReservationFormComponent],
      providers: [
        FormBuilder,
        DatePipe,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockFlightData },
        { provide: ReservationService, useValue: mockReservationService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: FlightService, useValue: mockFlightService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When component is loaded', () => {
    it('should initialize form with correct flight data', () => {
      expect(component.reservationForm.controls.flightNo.value).toBe(mockFlightData.flightNo);
      expect(component.reservationForm.controls.flightOrigin.value).toBe(mockFlightData.origin);
      expect(component.reservationForm.controls.flightDestination.value).toBe(mockFlightData.destination);
    });
  })

  describe('When user fill form with correct data', () => {
    it('should submit the form successfully', () => {
      component.reservationForm.controls.seatType.setValue("1");
      (component.reservationForm.controls.noOfSeats as FormControl).setValue("4");

      component.onSubmit();

      expect(mockReservationService.makeReservation).toHaveBeenCalled();
      expect(mockSnackbarService.show).toHaveBeenCalledWith('Reservation successful');
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  })

  describe('When user touch fields without filling forms', () => {
    it('should show error required', () => {
      component.reservationForm.controls.seatType.setValue("");
      (component.reservationForm.controls.noOfSeats as FormControl).setValue("");
      expect((component.reservationForm.controls.noOfSeats as FormControl).hasError('required')).toBeTrue();
    });
  })

  describe('When user fill form with no of seats greater than seats available', () => {
    it('should show error number of seats exceeds availability', () => {
      component.reservationForm.controls.seatType.setValue("1");
      (component.reservationForm.controls.noOfSeats as FormControl).setValue("6");
      expect((component.reservationForm.controls.noOfSeats as FormControl).hasError('max')).toBeTrue();
    });
  })
});
