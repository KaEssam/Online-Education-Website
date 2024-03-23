import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule,],
  providers: [AuthService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

signIn() {
  if (this.signInForm.valid) {
    this.authService.SignIn({
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }).subscribe(
      (res: any) => {
        if (res.token) { // Assuming your backend returns a token upon successful authentication
          console.log(res);
          alert('Sign-in successful');
          // Redirect or do something on successful sign-in
        } else {
          alert('Sign-in failed');
          // Handle unsuccessful sign-in
        }
      },
      (error) => {
        console.error('Error during sign-in:', error);
        // Handle error
      }
    );
  } else {
    alert('Form is invalid');
    // Handle form validation errors
  }
}

}







  

