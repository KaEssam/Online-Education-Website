import { AuthService } from "./../../../Services/auth.service";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, Renderer2, Signal, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../Services/products.service';
import { WishlistService } from "../../../Services/wishlist.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductsService, AuthService, CartService, WishlistService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  // number: any;
  // subscription: Subscription;
  constructor(private renderer: Renderer2, private el: ElementRef, private productService: ProductsService, private cartService: CartService, private wishlistService: WishlistService, private router: Router) {

    // this.subscription = this.productService.getBadgeCount().subscribe(number => { this.number = number });

  }
  

  AuthService = inject(AuthService);
  isStudent: boolean = false;

  cartItems: number = 0;
  wishItems: number = 0;

  ngOnInit(): void {
    this.AuthService.isStudent$.subscribe(res => {
      this.isStudent = this.AuthService.isStudent();
      
      
    });

    this.cartService.getCartItems().subscribe({
      next: (data:any) => {
        this.cartItems = data.length;
      },
    })

    this.wishlistService.getWishItems().subscribe({
      next: (data:any) => {
        this.wishItems = data.length;
      },
    })
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.AuthService.isStudent$.next(false);
    
  }







  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('#navbar');
    if (window.pageYOffset > 0) {
      this.renderer.addClass(navbar, 'shadow');
    } else {
      this.renderer.removeClass(navbar, 'shadow');
    }
  }

  // counter:Signal(0)

  // counter = signal(0);


}




