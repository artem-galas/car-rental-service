import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { CarDto } from '~/shared/dto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private afStore: AngularFirestore) { }

  getCars() {
    return this.afStore
      .collection<CarDto>('cars')
      .valueChanges();
  }
}
