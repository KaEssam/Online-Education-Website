import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import AOS from 'aos'; //AOS - 1
import { ProductsService } from '../../../Services/products.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [ProductsService,CartService,WishlistService],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {

  id: any;
  product: any;
  Products: any = [];
  displayedProducts: any[] = [];

  constructor(private productService: ProductsService, private router: Router, private Activated: ActivatedRoute,private cartService: CartService,private wishlistService: WishlistService) {
    this.id = this.Activated.snapshot.params["id"];
  }

  ngOnInit(): void {
    AOS.init();
    AOS.refresh();

    this.productService.getProductById(this.id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.Products = data;
        this.displayedProducts = this.Products.slice(0, 4);

      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })

  }



  

  counter = signal(1);
  plus() {
    this.counter.update(num => ++num);
  }
  minus() {
    this.counter.update(num => num > 0 ? --num : num);

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



