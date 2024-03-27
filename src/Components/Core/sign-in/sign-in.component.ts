import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule,RouterModule,],
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
      const email = this.signInForm.value.email;
      const password = this.signInForm.value.password;

      this.authService.signIn(email, password).subscribe(
        (res: any) => {
                      console.log(res);


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







  

