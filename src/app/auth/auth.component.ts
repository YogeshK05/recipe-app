import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'auth.component',
  templateUrl: 'auth.component.html'
})

export class AuthComponent {
  isLoginMode: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email: string = form.value.email;
    const password: string = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(response => {
      this.isLoading = false;
      this.errorMessage = "";
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.errorMessage = errorMessage;
      this.isLoading = false;
    })

    form.reset();
  }
  closeError() {
    this.errorMessage = null;
  }
}
