import { Component} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WishlistService } from '../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [WishlistService,CartService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  id: any;
  Products: any = [];

  constructor(private wishlistService: WishlistService,private cartService: CartService, private router: Router, private Activated: ActivatedRoute) {
    this.id = this.Activated.snapshot.params["id"];
  }


  ngOnInit(): void {
    this.loadWishItems();
  }

  loadWishItems() {
    this.wishlistService.getWishItems().subscribe({
      next: (data) => {
        setTimeout(() => {}, 1000);
        console.log(data);
        this.Products = data;
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

  deleteFromWish(id: any) {
    this.wishlistService.deleteFromCart(id).subscribe({
      next: (data) => {
        // Optional: Handle success actions
        console.log('Product deleted from cart successfully.', data);
        // Refresh cart items after deletion
        this.loadWishItems();
      },
      error: (err) => {
        // Handle error**********************
        console.error('Error deleting product from cart:', err);
      }
    });

  }

  showAlert = false; // Flag to control alert visibility
  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Product added to cart successfully.');
        alert("Added Successfully")
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding product to cart:', error);
      }
    );
  }
  
}
