import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../../Services/courses.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers: [CoursesService,CartService,WishlistService],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {
  allCourses: any = [];
  constructor(private coursesService: CoursesService, private router: Router,private cartService: CartService,private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
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
}
