import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  providers: [AuthService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  get isValidFirstName() {
    return this.signupForm.get('firstName')?.valid || this.signupForm.get('firstName')?.untouched;
  }

  get isValidLastName() {
    return this.signupForm.get('lastName')?.valid || this.signupForm.get('lastName')?.untouched;
  }

  get isValidEmail() {
    return this.signupForm.get('email')?.valid || this.signupForm.get('email')?.untouched;
  }

  get isValidPassword() {
    return this.signupForm.get('password')?.valid || this.signupForm.get('password')?.untouched;
  }

  get isValidConfirmPassword() {
    return this.signupForm.get('confirmPassword')?.valid || this.signupForm.get('confirmPassword')?.untouched;
  }

  passwordMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  validateAndSubmit() {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      this.Add(firstName, lastName, email, password);
      this.router.navigate(['/signin']);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }


  Add(firstName: string, lastName: string, email: string, password: string) {
    const newUser = { firstName, lastName, email, password };
    this.authService.SignUp(newUser).subscribe();
  }
}

