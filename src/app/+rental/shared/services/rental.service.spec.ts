import { TestBed } from '@angular/core/testing';

import { RentalService } from './rental.service';
import { CarDto } from '~/shared/dto';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { snapshotChanges } from '@angular/fire/database';
import { TokenService } from '~/shared/services';

const rentalsMock: Array<CarDto> = [
  {
    price: 33,
    model: 'Audi',
    image: '',
    id: '1'
  }
];

const data = from(rentalsMock);

const actions = [
  {
    type: 'added',
    payload: {
      doc: {
        data: () => rentalsMock[0],
        id: rentalsMock[0].id
      }
    }
  }
];

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and
    .returnValue(data),
  snapshotChanges: jasmine.createSpy('snapshotChanges').and
    .returnValue(actions)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and
    .returnValue(collectionStub)
};

describe('RentalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RentalService,
      {
        provide: AngularFirestore, useValue: angularFirestoreStub
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
  }));

  it('should be created', () => {
    const service: RentalService = TestBed.get(RentalService);
    expect(service)
      .toBeTruthy();
  });
});
