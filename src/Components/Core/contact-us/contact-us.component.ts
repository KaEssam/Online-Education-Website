import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  name = '';
  email = '';
  comment = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.log(formData);
    // You can implement your logic to process the form data here
    this.name = '';
    this.email = '';
    this.comment = '';
  }
}
