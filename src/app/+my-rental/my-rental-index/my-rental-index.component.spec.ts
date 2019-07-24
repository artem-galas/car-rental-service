import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MyRentalIndexComponent } from './my-rental-index.component';
import { MaterialModule } from '~/framework';
import { MyRentalService } from '~/+my-rental/shared/services/my-rental.service';
import { MyRentalDto } from '~/shared/dto';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material';
import { TokenService } from '~/shared/services';

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

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatSnackBarModule,
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
    expect(component).toBeTruthy();
  });
});
