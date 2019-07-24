import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBookingDialogComponent } from './confirm-booking-dialog.component';
import { MaterialModule } from '~/framework';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatSliderModule } from '@angular/material';

describe('ConfirmBookingDialogComponent', () => {
  let component: ConfirmBookingDialogComponent;
  let fixture: ComponentFixture<ConfirmBookingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatDialogModule,
        MatSliderModule
      ],
      declarations: [ ConfirmBookingDialogComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { carId: '1', carPrice: 29 }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => { }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
