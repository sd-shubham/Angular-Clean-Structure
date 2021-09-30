import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-otp',
  templateUrl: './login-otp.component.html',
})
export class LoginOtpComponent implements OnInit {
  otpForm: FormGroup;
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}
  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }
  validateOtp() {
    const otp: string = this.otpForm.controls.otp.value;
    this.authService.validateOtp(otp).subscribe((resp) => {
      if (resp.access_Token) {
        this.router.navigate(['/home']);
      }
    });
  }
}
