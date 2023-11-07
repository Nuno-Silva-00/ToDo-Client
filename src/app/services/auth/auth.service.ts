import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
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
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.path + '/login',
      {
        email,
        password
      }
    );
  }
}
