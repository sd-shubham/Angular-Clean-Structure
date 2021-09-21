import { Routes } from '@angular/router';
import { LoginAuthComponent } from './components/login-auth/login-auth.component';
import { LoginComponent } from './components/login-form/login.component';
import { AuthorizationGuard } from './guard/authorization.guard';
export const loginRoute: Routes = [
  {
    path: '',
    component: LoginAuthComponent,
    children: [
      {
        path: 'login',
        canActivate: [AuthorizationGuard],
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
];
