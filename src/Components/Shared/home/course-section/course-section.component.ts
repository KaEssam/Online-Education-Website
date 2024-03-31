import { Component } from '@angular/core';
import { CourseItemComponent } from '../../course-item/course-item.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoursesService } from '../../../../Services/courses.service';
import { CartService } from '../../../../Services/cart.service';
import { WishlistService } from '../../../../Services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CourseItemComponent, RouterModule, HttpClientModule],
  providers: [CoursesService,CartService,WishlistService],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent {
  allCourses: any = [];
  categoryCourses: any = [];
  displayedCourses: any[] = [];
  displayedCategoryCourses: any[] = [];
  constructor(private coursesService: CoursesService,private cartService: CartService,private wishlistService: WishlistService, private router: Router) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
        this.displayedCourses = this.allCourses.slice(0, 4);
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }

  filterProducts(category: string): void {
    if (category === 'all') {
      // Call service method to get all products
      this.coursesService.getAllCourses().subscribe({
        next: (data) => {
          this.allCourses = data;
          this.displayedCourses = this.allCourses.slice(0, 4);

        },
        error: (err) => {
          this.router.navigate(['/Error', { errorMessage: err.message as string }]);
        }
      })
    } else {
      // Call service method to get products by category
      this.coursesService.getCoursesByCategory(category).subscribe({
        next: (data) => {
          this.categoryCourses = data;
          this.displayedCategoryCourses = this.categoryCourses.slice(0, 4);

        },
        error: (err) => {
          this.router.navigate(['/Error', { errorMessage: err.message as string }]);
        }
      })
    }
  }



  addToCart(id: any) {
    this.cartService.addToCart(id).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Product added to cart successfully.');
        this.confirmAdd();
        // alert("added successfully!!")
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding product to cart:', error);
      }
    );
  }


  addToWishlist(id: any) {
    this.wishlistService.addToWish(id).subscribe(
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


  confirmAdd() {
    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }

}
