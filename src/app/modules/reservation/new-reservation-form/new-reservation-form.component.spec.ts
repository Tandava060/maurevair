import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservationFormComponent } from './new-reservation-form.component';

describe('NewReservationFormComponent', () => {
  let component: NewReservationFormComponent;
  let fixture: ComponentFixture<NewReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReservationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
