import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, HostListener, Renderer2, Signal, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductsService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // number: any;
  // subscription: Subscription;
  constructor(private renderer: Renderer2, private el: ElementRef, private productService: ProductsService) {

    // this.subscription = this.productService.getBadgeCount().subscribe(number => { this.number = number });

  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

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




