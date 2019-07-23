import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly angularFireAuth: AngularFireAuth) { }

  signUp({email, password, fullName}: {email: string, password: string, fullName: string}) {
    return from(
      this.angularFireAuth.auth
        .createUserWithEmailAndPassword(email, password)
      )
      .pipe(
        map((userCredential: auth.UserCredential) => {
          return userCredential.user;
        }),
        switchMap((user) => user.updateProfile({
          displayName: fullName
        })),
        catchError(error => throwError(error.message as string))
      );
  }

  signIn({email, password}: {email: string, password: string}) {
    return from(
      this.angularFireAuth.auth
        .signInWithEmailAndPassword(email, password)
    )
      .pipe(
        map((userCredential: auth.UserCredential) => {
          return userCredential.user;
        }),
        catchError(error => throwError(error.message as string))
      );
  }

  signOut() {
    return from(
      this.angularFireAuth.auth.signOut()
    );
  }
}
