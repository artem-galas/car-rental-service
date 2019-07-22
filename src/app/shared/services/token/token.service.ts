import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * TokenService
 *
 * Manipulate with jwtToken and localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private readonly http: HttpClient) {}

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

  /**
   * loadUser
   * @description
   * Get user information from server
   */
  loadUser(): Observable<any> {
    return this.http.get(`/api/profile`);
  }
}
