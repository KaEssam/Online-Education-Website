import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  })

  // Getter for easy access to form controls
  get formControls() {
    return this.subscribeForm.controls;
  }

  onSubmit() {
    // Check if the form is valid
    if (this.subscribeForm.invalid) {
      return;
    }

    // If the form is valid, you can proceed with the subscription process
    console.log('Email:', this.subscribeForm.value.email);

    // Optionally, you can reset the form after successful submission
    // this.subscribeForm.reset();
  }
}
