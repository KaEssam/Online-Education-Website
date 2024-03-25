import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos'; //AOS - 1

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  ngOnInit(): void {
    AOS.init();
    AOS.refresh();
  }
}
