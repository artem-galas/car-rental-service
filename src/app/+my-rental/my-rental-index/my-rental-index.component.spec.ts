import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material';

import { from, of } from 'rxjs';

import { MaterialModule } from '~/framework';
import { MyRentalDto } from '~/shared/dto';
import { TokenService } from '~/shared/services';

import { MyRentalService } from '../shared/services/my-rental.service';
import { MyRentalIndexComponent } from './my-rental-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const myRentalMock: Array<MyRentalDto> = [
  {
    from: new Date(),
    to: new Date(),
    id: 'ABC1',
    model: 'Audi',
    image: ''
  }
];

describe('MyRentalIndexComponent', () => {
  let component: MyRentalIndexComponent;
  let fixture: ComponentFixture<MyRentalIndexComponent>;
  let service;

  beforeEach(async(() => {
    service = jasmine.createSpyObj('MyRentalService', ['getMyRental', 'backCar']);
    service.getMyRental
      .and
      .returnValue(of(myRentalMock));

    service.backCar
      .and
      .returnValue(from(Promise.resolve()));

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ MyRentalIndexComponent ],
      providers: [
        {
          provide: MyRentalService, useValue: service
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
    fixture = TestBed.createComponent(MyRentalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should display rentals', () => {
    const listElements = fixture.debugElement.queryAll(By.css('mat-list-item'));

    expect(listElements.length)
      .toBe(myRentalMock.length);
  });

  describe('.backCar', () => {
    it('should return car', () => {
      const carID = 'ABC1';

      component.backCar(carID);

      expect(service.backCar)
        .toHaveBeenCalledWith(carID);
    });
  });
});
