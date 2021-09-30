import { Injectable } from '@angular/core';
import { Observable, pipe, Subject, Subscription, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  ICurrentUser,
  ILogin,
  ILoginResponse,
  ITokenClaims,
} from '../models/auth.models';
import { AppHttpClient } from '../../shared/helper/http-client.service';
import { APP_TOKEN_LOCAL_STORAGE_KEY } from '../../shared/model/common.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUserInfo: Partial<ICurrentUser>;
  token: string;
  private timer = timer(0, 1000);
  private timerHandler: Subscription;
  subject = new Subject();
  constructor(
    private readonly http: AppHttpClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly roter: Router
  ) {}
  public login(login: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILogin, ILoginResponse>('auth/login', login).pipe(
      map((data) => {
        this.token = data.access_Token;
        // localStorage.setItem(APP_TOKEN_LOCAL_STORAGE_KEY, data.access_Token);
        this.currentUserInfo = {
          userId: data.userId,
        };
        if (this.token) this.setUserDetailsFromTokenClaims();
        return data;
      })
    );
  }
  private get tokenHeader() {
    return {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }
  public validateOtp(otp: string): Observable<{ access_Token: string }> {
    return this.http
      .get<{ access_Token: string }>(
        `auth/validate-otp/${otp}`,
        this.tokenHeader
      )
      .pipe(
        map((resp) => {
          localStorage.setItem(APP_TOKEN_LOCAL_STORAGE_KEY, resp.access_Token);
          this.token = resp.access_Token;
          this.setUserDetailsFromTokenClaims();
          this.tokenValidityCheckTimer();
          return resp;
        })
      );
  }

  private setUserDetailsFromTokenClaims() {
    if (this.token) {
      var detail = this.jwtHelper.decodeToken(this.token);
      const { sub, name } = this.jwtHelper.decodeToken(this.token);
      this.currentUserInfo = {
        userId: +sub,
        name: name,
        role: detail[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
      };
      console.log(this.currentUserInfo);
    }
  }
  public get isUserAuthenticated() {
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }
  public get loggedInUser() {
    return this.currentUserInfo;
  }
  public setAuthFromLocalStorage() {
    const token = localStorage.getItem(APP_TOKEN_LOCAL_STORAGE_KEY);
    this.token = token;
    this.tokenValidityCheckTimer();
    this.setUserDetailsFromTokenClaims();
  }
  private tokenValidityCheckTimer() {
    this.timerHandler = this.timer
      .pipe(takeUntil(this.subject))
      .subscribe(() => {
        if (
          new Date() >=
            new Date(this.jwtHelper.getTokenExpirationDate(this.token)) &&
          this.token
        ) {
          // call log out functionality here
          this.logout();
          this.timerHandler.unsubscribe();
          localStorage.removeItem(APP_TOKEN_LOCAL_STORAGE_KEY);
          this.roter.navigate(['/auth/login']);
        }
      });
  }
  public removelocalstorage() {
    localStorage.removeItem(APP_TOKEN_LOCAL_STORAGE_KEY);
    this.token = null;
    this.currentUserInfo = null;
    if (this.timerHandler) {
      this.timerHandler.unsubscribe();
    }
  }
  public logout(): Observable<void> {
    if (!this.token || !this.currentUserInfo) {
      return;
    }
    // call log-out api here.

    // return this.httpClient.put(`auth/logout/${this.currentUser.id}`, null)
    //   .pipe(map(() => {
    //     this.removelocalstorage();
    //     this.subject.next();
    //   }));

    // below code is only for testing
    this.removelocalstorage();
    this.subject.next();
  }
  public loadMenus() {
    // load menues here..
    this.setAuthFromLocalStorage();
  }
}
