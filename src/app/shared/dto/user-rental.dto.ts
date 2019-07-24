import { DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import { BaseDto } from './base.dto';

export interface UserRentalDto extends BaseDto {
  ref: DocumentReference;
  from: Timestamp;
  to: Timestamp;
}

export interface MyRentalDto {
  model: string;
  id: string;
  image: string;
  to: Date;
  from: Date;
}
