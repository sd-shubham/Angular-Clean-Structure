import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoaded: boolean;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit() {
    debugger;
    this.initialization();
  }
  initialization() {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
    });
    this.isLoaded = true;
  }
  login() {
    const login: ILogin = {
      userName: this.loginForm.controls.userName.value,
      password: this.loginForm.controls.password.value,
    };
    this.authService.login(login).subscribe((result) => {
      if (result.access_Token && result.userId)
        this.router.navigate(['/home/dashboard']);
    });
  }
}
