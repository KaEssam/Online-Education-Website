import { HttpClientJsonpModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [HttpClientJsonpModule,RouterModule],
  providers:[ProductsService,CartService,WishlistService],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  Products:any = [];

  constructor(private productsService:ProductsService , private router:Router,private cartService: CartService,private wishlistService: WishlistService){ }
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next:(data)=>{
        this.Products = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errorMessage : err.message as string}]);
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
}
