import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(name, email, password);
    }

    authObs.subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (errorMessage) => {
        this.error = errorMessage;
      },
      complete: () => {
        console.info('complete')
      }
    });

    this.isLoading = false;
    form.reset();
  }

}
