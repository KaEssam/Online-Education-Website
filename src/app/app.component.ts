
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Components/Layout/header/header.component';
import { FooterComponent } from '../Components/Layout/footer/footer.component';
import { SignInComponent } from '../Components/Core/sign-in/sign-in.component';
import { SignUpComponent } from '../Components/Core/sign-up/sign-up.component';
import { ErrorPageComponent } from '../Components/Core/error-page/error-page.component';
import { ContactUsComponent } from '../Components/Core/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,SignInComponent,SignUpComponent,ErrorPageComponent,ContactUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Online-Education-Website';
}
