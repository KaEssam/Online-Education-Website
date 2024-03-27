import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  providers:[CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Products: any = [];
  id: any;
  
  constructor(private cartService: CartService, private router: Router, private Activated: ActivatedRoute) {
    this.id = this.Activated.snapshot.params["id"];
  }
  

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.Products = data;
        this.calculateTotalPrice();
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }

  // Define a trackBy function to improve performance
  trackByFn(index: number, item: any) {
    return item.id; // Assuming each product has an 'id' property
  }



  deleteFromCart(id:any) {
    this.cartService.deleteFromCart(id).subscribe({
      next: (data) =>{
        // Optional: Handle success actions
        console.log('Product deleted from cart successfully.',data);
        // Refresh cart items after deletion
        this.loadCartItems();
      },
      error: (err) => {
        // Handle error**********************
        console.error('Error deleting product from cart:', err);
      }
  });
  }

  totalPrice: number = 0; // Initialize total price to zero
  calculateTotalPrice() {
    // Iterate through cart items and sum up prices
    this.totalPrice = this.Products.reduce((total:number, product:any) => total + product.price, 0);
  }
}
