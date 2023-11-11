import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.path + '/create',
      {
        name,
        email,
        password
      }
    ).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.path + '/login',
      {
        email,
        password
      }
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => errorMessage);
    }

    switch (errorRes.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not Found!';
        break;
      case 'WRONG_PASSWORD':
        errorMessage = 'Wrong Password!';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email already exists!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
