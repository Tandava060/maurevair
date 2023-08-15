import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { UserLogin } from '../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit() { 
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value as UserLogin).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  isFieldValid(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.touched && this.loginForm.get(controlName)?.hasError(errorName);
  }
}
