import { AboutUsComponent } from "../Components/Core/about-us/about-us.component";
import { CartComponent } from "../Components/Core/cart/cart.component";
import { CheckOutComponent } from "../Components/Core/check-out/check-out.component";
import { ContactUsComponent } from "../Components/Core/contact-us/contact-us.component";
import { ErrorPageComponent } from "../Components/Core/error-page/error-page.component";
import { ProductCartComponent } from "../Components/Core/product-cart/product-cart.component";
import { SignInComponent } from "../Components/Core/sign-in/sign-in.component";
import { WishlistComponent } from "../Components/Core/wishlist/wishlist.component";
import { AfterEnrollComponent } from "../Components/Shared/after-enroll/after-enroll.component";
import { CourseItemComponent } from "../Components/Shared/course-item/course-item.component";
import { EventItemComponent } from "../Components/Shared/event-item/event-item.component";
import { HomeComponent } from "../Components/Shared/home/home.component";
import { ProductItemComponent } from "../Components/Shared/product-item/product-item.component";
import { SignUpComponent } from "./../Components/Core/sign-up/sign-up.component";
import { Routes } from '@angular/router';
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: "home", component:HomeComponent},
  {path: "signup", component:SignUpComponent},
  {path: "signIn", component:SignInComponent},
  {path: "products", component:ProductItemComponent},
  {path: "products/:id", component:ProductCartComponent},
  {path: "courses", component:CourseItemComponent},
  {path: "productDetails", component:ProductCartComponent},
  {path: "events", component:EventItemComponent},
  {path: "about", component:AboutUsComponent},
  {path: "contact", component:ContactUsComponent},
  {path: "cart", component:CartComponent},
  {path: "checkout", component:CheckOutComponent},
  {path: "wishlist", component:WishlistComponent},
  {path: "enroll", component:AfterEnrollComponent},
  {path: "signOut", component:HomeComponent},
  {path: "**", component:ErrorPageComponent},


  // {path: "instructor", component:AfterEnrollComponent},
  // {path: "student", component:SignUpComponent},
];
