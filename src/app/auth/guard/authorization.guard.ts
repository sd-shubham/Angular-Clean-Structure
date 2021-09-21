import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
  loginPath = '/auth/login';
  //homePath = '/home/dashboard';
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    { url }: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    switch (url) {
      case this.loginPath:
        return this.validateLoginPath();
      default:
        return this.validateOtherPath();
    }
  }
  validateLoginPath(): boolean {
    if (this.authService.isUserAuthenticated) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  validateOtherPath(): boolean {
    if (this.authService.isUserAuthenticated) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
