import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

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
    this.isLoading = !this.isLoading;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: (v) => {
          console.log(v)
        },
        error: (e) => {
          console.error(e)
        },
        complete: () => {
          console.info('complete')
        }
      });

      this.isLoading = !this.isLoading;
      form.reset();
    } else {
      this.authService.signup(name, email, password).subscribe({
        next: (v) => {
          console.log(v)
        },
        error: (e) => {
          this.error = e;
        },
        complete: () => {
          console.info('complete')
        }
      });
      this.isLoading = !this.isLoading;
      form.reset();
    }



  }
}
