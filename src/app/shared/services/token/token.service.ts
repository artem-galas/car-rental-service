import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

/**
 * TokenService
 *
 * Manipulate with jwtToken and localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  currentUser;
  constructor(private readonly afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid
        };
      }
    });
  }

  static getToken(): string {
    return localStorage.getItem(environment.token);
  }

  static setToken(token: string) {
    localStorage.setItem(environment.token, token);
  }

  static hasToken(): boolean {
    return !!localStorage.getItem(environment.token);
  }

  static getUserInfoFromToken() {
    return this.parseJWT(this.getToken());
  }

  private static parseJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url
      .replace('-', '+')
      .replace('_', '/');

    return JSON.parse(window.atob(base64));
  }
}
