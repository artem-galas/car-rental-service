import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CarDto, MyRentalDto, UserRentalDto } from '~/shared/dto';
import { TokenService } from '~/shared/services';

@Injectable({
  providedIn: 'root'
})
export class MyRentalService {

  constructor(private readonly afStore: AngularFirestore,
              private readonly tokenService: TokenService) { }

  getMyRental(): Observable<Array<MyRentalDto>> {
    return this.afStore.collection<UserRentalDto>(`user-rental/${this.tokenService.currentUser.uid}/cars`)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        })),
        switchMap(rentals => {
          if (rentals.length === 0) {
            return of([]);
          }
          const cars = this.getCarsDocumentFromRentals(rentals);

          return combineLatest(cars);
        })
      );
  }

  backCar(collectionId: string) {
    return from(
      this.afStore.collection(`user-rental/${this.tokenService.currentUser.uid}/cars`)
        .doc(collectionId)
        .delete()
      )
      .pipe(
        catchError(error => throwError(error.message as string))
      );
  }

  private getCarsDocumentFromRentals(rentals: Array<UserRentalDto>) {
    return rentals.map(cur => this.afStore.doc<CarDto>(cur.ref.path)
      .valueChanges()
      .pipe(
        map(d => {
          return {
            model: d.model,
            id: cur.id,
            image: d.image,
            to: cur.to.toDate(),
            from: cur.from.toDate(),
          } as MyRentalDto;
        })
      )
    );
  }
}
