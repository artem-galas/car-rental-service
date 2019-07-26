import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';

import { of } from 'rxjs';
import { MaterialModule } from '~/framework';
import { CarDto } from '~/shared/dto';

import { RentalService } from '~/+rental/shared/services/rental.service';
import { RentalIndexComponent } from './rental-index.component';
import { TokenService } from '~/shared/services';
import { ConfirmBookingDialogModule } from '~/shared/components';

const mockCars: Array<CarDto> = [
  {
    image: '',
    model: 'Audi',
    id: '1',
    price: 29
  }
];


describe('RentalIndexComponent', () => {
  let component: RentalIndexComponent;
  let fixture: ComponentFixture<RentalIndexComponent>;
  let service;
  let router;

  beforeEach(async(() => {
    service = jasmine.createSpyObj('RentalService', ['getCars']);
    service
      .getCars
      .and
      .returnValue(of(mockCars));

    router = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSnackBarModule,
        ConfirmBookingDialogModule
      ],
      declarations: [ RentalIndexComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: RentalService, useValue: service
        },
        {
          provide: TokenService, useValue: {
            currentUser: {
              email: 'fake@mail.com',
              displayName: 'Fake Name',
              uid: 'fakeUid'
            }
          }
        },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  describe('.bookCar', () => {
    it('should open confirm when user logged in', () => {
      component.bookCar(mockCars[0]);

      expect(component.dialogRef)
        .toBeTruthy();
    });

    it('should navigate if user is not logged in', () => {
      const tokenService = TestBed.get(TokenService);
      tokenService.currentUser = null;

      component.bookCar(mockCars[0]);

      expect(router.navigate)
        .toHaveBeenCalledWith(['auth', 'sign-in']);
    });
  });
});
