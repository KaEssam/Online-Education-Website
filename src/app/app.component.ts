
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Components/Layout/header/header.component';
import { FooterComponent } from '../Components/Layout/footer/footer.component';
import { SignInComponent } from '../Components/Core/sign-in/sign-in.component';
import { SignUpComponent } from '../Components/Core/sign-up/sign-up.component';
import { ErrorPageComponent } from '../Components/Core/error-page/error-page.component';
import { ContactUsComponent } from '../Components/Core/contact-us/contact-us.component';
import { AboutUsComponent } from '../Components/Core/about-us/about-us.component';
import { CourseItemComponent } from '../Components/Shared/course-item/course-item.component';
import { EventItemComponent } from '../Components/Shared/event-item/event-item.component';
import { CartComponent } from '../Components/Core/cart/cart.component';
import { CheckOutComponent } from '../Components/Core/check-out/check-out.component';
import { WishlistComponent } from '../Components/Core/wishlist/wishlist.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    ErrorPageComponent,
    ContactUsComponent,
    AboutUsComponent,
    CourseItemComponent,
    EventItemComponent,
  CartComponent,
CheckOutComponent,
WishlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Online-Education-Website';
}
