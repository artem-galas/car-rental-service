import { TestBed } from '@angular/core/testing';

import { MyRentalService } from './my-rental.service';
import { TokenService } from '~/shared/services';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { CarDto, UserRentalDto } from '~/shared/dto';
import { from, of } from 'rxjs';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

const userRentals: UserRentalDto = {
  id: 'ABC1',
  ref: {
    path: 'cars/id'
  } as DocumentReference,
  from: Timestamp.now(),
  to: Timestamp.now(),
};

const mockCar = {
  price: 33,
  model: 'Audi',
  image: '',
  id: '1'
};

const data = from([userRentals]);

const actions = [
  {
    type: 'added',
    payload: {
      doc: {
        data: () => userRentals,
        id: userRentals.id
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

const docStub = {
  valueChanges: jasmine.createSpy('valueChanges').and
    .returnValue(of(mockCar)),
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and
    .returnValue(collectionStub),
  doc: jasmine.createSpy('doc')
    .and
    .returnValue(docStub)
};

describe('MyRentalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyRentalService,
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
    const service: MyRentalService = TestBed.get(MyRentalService);
    expect(service)
      .toBeTruthy();
  });
});
