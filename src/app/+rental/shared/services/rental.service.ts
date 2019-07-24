import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, throwError } from 'rxjs';
import { CarDto } from '~/shared/dto';
import { TokenService } from '~/shared/services';
import { catchError, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private afStore: AngularFirestore,
              private readonly tokenService: TokenService) {
  }

  getCars() {
    return this.afStore
      .collection<CarDto>('cars')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as CarDto;
          const id = a.payload.doc.id;

          return { id, ...data };
        }))
      );
  }

  bookCar({car, numberOfDays}: {car: CarDto, numberOfDays: number}) {
    const userRental = this.afStore.collection('user-rental');
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + numberOfDays);

    return from(
      userRental
        .doc(this.tokenService.currentUser.uid)
        .collection('cars')
        .add({
          ref: this.afStore.doc(`cars/${car.id}`).ref,
          from: Timestamp.fromDate(fromDate),
          to: Timestamp.fromDate(toDate)
        })
      )
      .pipe(
        map(() => ({
          model: car.model,
          numberOfDays
        })),
        catchError(error => throwError(error.message as string))
      );
  }
}
