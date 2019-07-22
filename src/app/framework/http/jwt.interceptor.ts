import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TokenService } from '~/shared/services';

/**
 * JwtInterceptor
 *
 * Set Authorization into header for each request
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (TokenService.hasToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${TokenService.getToken()}`
        }
      });
    } else {
      request = request.clone();
    }

    return next.handle(request);
  }
}
