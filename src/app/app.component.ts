
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './Core/sign-in/sign-in.component';
import { SignUpComponent } from './Core/sign-up/sign-up.component';
import { HeaderComponent } from '../Components/Layout/header/header.component';
import { FooterComponent } from '../Components/Layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SignInComponent,SignUpComponent,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Online-Education-Website';
}
