import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { MaterialModule } from '~/framework';
import { CarDto } from '~/shared/dto';

import { RentalService } from '~/+rental/shared/services/rental.service';
import { RentalIndexComponent } from './rental-index.component';
import { TokenService } from '~/shared/services';

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

  beforeEach(async(() => {
    service = jasmine.createSpyObj('RentalService', ['getCars']);
    service
      .getCars
      .and
      .returnValue(of(mockCars));

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule
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
        }
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
});
