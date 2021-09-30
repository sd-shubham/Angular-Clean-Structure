import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { loginRoute } from './auth-routing.config';
import { LoginAuthComponent } from './components/login-auth/login-auth.component';
import { LoginComponent } from './components/login-form/login.component';
import { LoginOtpComponent } from './components/login-otp/login-otp.component';
@NgModule({
  declarations: [LoginAuthComponent, LoginComponent, LoginOtpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoute),
  ],
})
export class AuthModule {}
