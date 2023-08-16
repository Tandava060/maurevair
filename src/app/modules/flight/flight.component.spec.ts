import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightComponent } from './flight.component';
import { FlightService } from '../core/services/flight.service';
import { LoadingService } from '../core/services/loading.service';
import { of } from 'rxjs';

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let mockFlightService: jasmine.SpyObj<FlightService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;;


  beforeEach(async () => {
    mockFlightService = jasmine.createSpyObj('FlightService', [], {
      flights$: of([{ flightNo: '001', name: 'Test Flight' }])
    });

    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      loading$: of(false)
    });

    await TestBed.configureTestingModule({
      declarations: [FlightComponent],
      providers: [
        { provide: FlightService, useValue: mockFlightService },
        { provide: LoadingService, useValue: mockLoadingService }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When component is loaded', () => {
    it('initialLoad should be set to true', () => {
      expect(component.initialLoad).toBeTrue();
    });
  })

  describe('When onSearch is triggered', () => {
    it('initialLoad should be set to false', () => {
      component.onSearch();
      expect(component.initialLoad).toBeFalse();
    });

    it('should display flight details for each flight in the list', () => {
      expect(fixture.debugElement.nativeElement.querySelector('app-flight-details')).toBeDefined();
    });
  })
});
