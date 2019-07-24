import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { combineLatest, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CarDto } from '~/shared/dto';

@Injectable({
  providedIn: 'root'
})
export class MyRentalService {

  constructor(private readonly afStore: AngularFirestore,
              private readonly afAuth: AngularFireAuth) { }

  getMyRental() {
    return this.afAuth.user
      .pipe(
        switchMap(user => {
          return this.afStore.collection(`user-rental/${user.uid}/cars`)
            .stateChanges()
            .pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data() as {ref: DocumentReference};
                const id = a.payload.doc.id;

                return { id, refPath: data.ref.path };
              }))
            );
        }),
        switchMap(data => {
          if (data.length === 0) {
            return of([]);
          }

          const cars = data.map(cur => this.afStore.doc<CarDto>(cur.refPath)
            .valueChanges()
            .pipe(
              map(d => {
                return { ...d, id: cur.id };
              })
            )
          );

          return combineLatest(cars);
        })
      );
  }

  backCar(collectionId: string) {
    return this.afAuth.user
      .pipe(
        switchMap(user => {
          return this.afStore.collection<{cars: Array<DocumentReference>}>(`user-rental/${user.uid}/cars`)
            .doc(collectionId)
            .delete();
        }),
        catchError(error => throwError(error.message as string))
      );
  }
}
