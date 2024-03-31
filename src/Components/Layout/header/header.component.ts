import { AuthService } from "./../../../Services/auth.service";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, Renderer2, Signal, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductsService, AuthService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  // number: any;
  // subscription: Subscription;
  constructor(private renderer: Renderer2, private el: ElementRef, private productService: ProductsService,) {

    // this.subscription = this.productService.getBadgeCount().subscribe(number => { this.number = number });

  }
  

  AuthService = inject(AuthService);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.AuthService.isLoggedIn$.subscribe(res => {
    this.isLoggedIn = this.AuthService.isLoggedIn();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.AuthService.isLoggedIn$.next(false);
    
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




