import { WishlistService } from './../../../../Services/wishlist.service';
import { Component, Input, input } from '@angular/core';
import { ProductItemComponent } from '../../product-item/product-item.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../../Services/products.service';
import { CartService } from '../../../../Services/cart.service';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [ProductItemComponent, RouterModule, HttpClientModule],
  providers: [ProductsService, CartService,WishlistService],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
  Products: any = [];
  displayedProducts: any[] = [];
  constructor(private productsService: ProductsService, private router: Router, private cartService: CartService,private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.Products = data;
        this.displayedProducts = this.Products.slice(0, 4);

      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }


  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Product added to cart successfully.');
        alert("added successfully!!")
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding product to cart:', error);
      }
    );
  }


  addToWishlist(product: any) {
    this.wishlistService.addToWish(product).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Product added to cart successfully.');
        alert("added successfully!!")
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding product to cart:', error);
      }
    );
  }

  // public count: number = 0;
  // sendNumber() {
  //   this.productsService.incrementBadgeCount(); // Notify header component to update badge count
  //   alert("addedddddddddddddddddddddddddddddddddddddddddddddd");
  // }
  // Increment() {
  //   this.count++;
  //   console.log("done");
  //   return this.count;
  // }

}
