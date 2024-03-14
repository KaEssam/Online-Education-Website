import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
  }

  confirmPasswordValidator(control: FormGroup): { [s: string]: boolean } | undefined {
    if (control.value !== this.signupForm?.get('password')?.value) {
      return { 'passwordMismatch': true };
    }
    return undefined;
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.signupForm?.value);
  }
}
