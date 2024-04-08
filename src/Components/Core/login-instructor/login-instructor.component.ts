import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginInstructorService } from '../../../Services/login-instructor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login-instructor',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, RouterModule],
  providers: [LoginInstructorService],
  templateUrl: './login-instructor.component.html',
  styleUrl: './login-instructor.component.css'
})
export class LoginInstructorComponent implements OnInit {
  LoginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoginInstructorService: LoginInstructorService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initForm();
  }

wrongCredentials: boolean = false;

  initForm() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  login() {
    if (this.LoginForm.valid) {
      const email = this.LoginForm.value.email;
      const password = this.LoginForm.value.password;
      this.LoginInstructorService.Login(email, password).subscribe(
        (res: any) => {
          localStorage.setItem("token", res.accessToken);
          localStorage.setItem("type", "instructor");
          this.router.navigate(['/instructor']);
          this.wrongCredentials = false;
        },
        (error) => {
          console.error('Error during sign-in:', error);
          this.wrongCredentials = true;
          // Handle error
        }
      );
    } else {
      alert('Form is invalid');

      // Handle form validation errors
    }
  }

}
