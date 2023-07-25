import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  kind?: string,
  registered?: boolean,
  displayName?: string,
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenExpirationTimer: any = null;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.request<AuthResponseData>('POST', 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
      {
        body: {
          email: email,
          password: password,
          returnSecureToken: true
        }
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthenticatedUser(resData.email, resData.localId, resData.idToken, resData.expiresIn)
      }))
  }

  logIn(email: string, password: string) {
    return this.http.request<AuthResponseData>('POST', 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey, {
      body: {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthenticatedUser(resData.email, resData.localId, resData.idToken, resData.expiresIn)
    }))
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer = null;
    }
  }

  handleAuthenticatedUser(email: string, id: string, token: string, expiresIn: string) {
    const expiresInDate = new Date(new Date().getTime() + +expiresIn * 1000);

    const user = new User(id, email, token, expiresInDate)

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }

  autoLogin() {
    const savedUser: {
      email: string,
      id: string,
      _token: string,
      _expirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!savedUser) { return }

    const loadedUser = new User(savedUser.id, savedUser.email, savedUser._token, new Date(savedUser._expirationDate));

    this.autoLogout(new Date(savedUser._expirationDate).getTime() - new Date().getTime())

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logOut(), expirationDuration)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured!'
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(() => errorMessage)
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid or the user does not have a password.';
          break;
      }
      return throwError(() => errorMessage)
    }
  }
}
