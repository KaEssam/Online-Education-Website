import { SignUpComponent } from "./../Components/Core/sign-up/sign-up.component";
import { Routes } from '@angular/router';
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: "signup", component:SignUpComponent},
];
