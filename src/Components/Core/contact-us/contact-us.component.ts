import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required]
    });
  }


  get isValidFirstName() {
    return this.contactForm.get('name')?.valid || this.contactForm.get('name')?.untouched;
  }

  get isValidComment() {
    return this.contactForm.get('comment')?.valid || this.contactForm.get('comment')?.untouched;
  }

  get isValidEmail() {
    return this.contactForm.get('email')?.valid || this.contactForm.get('email')?.untouched;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Thank you for contacting us');
      this.contactForm.reset();
    }
  }
}
