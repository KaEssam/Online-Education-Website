import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';
import AOS from 'aos'; //AOS - 1
import { CoursesService } from '../../../Services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [CoursesService, CartService, WishlistService],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  id: any;
  Course: any;
  Courses: any = [];
  displayedCourses: any[] = [];

  constructor(private courseService: CoursesService, private router: Router, private Activated: ActivatedRoute, private cartService: CartService, private wishlistService: WishlistService) {
    this.id = this.Activated.snapshot.params["id"];
  }

  ngOnInit(): void {
    AOS.init();
    AOS.refresh();

    this.courseService.getCourseById(this.id).subscribe({
      next: (data) => {
        this.Course = data;
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }




  addToCart(id: any) {
    this.cartService.addToCart(id).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Course added to cart successfully.');
        this.confirmAddToCart();
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding Course to cart:', error);
      }
    );
  }


  addToWishlist(id: any) {
    this.wishlistService.addToWish(id).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Course added to cart successfully.');
        this.confirmAddToWish();
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding Course to cart:', error);
      }
    );
  }


  confirmAddToCart() {
    Swal.fire({
      icon: "success",
      title: "Added To Cart Successfully!",
      showConfirmButton: false,
      timer: 1500,
      position: "top-end",
      toast: true,
      customClass: {
        title: 'myCustomTitle'
      }
    });
  }

  confirmAddToWish() {
    Swal.fire({
      icon: "success",
      title: "Added To Wishlist Successfully!",
      showConfirmButton: false,
      timer: 1500,
      width: '390px',
      position: "top-end",
      toast: true,
      customClass: {
        title: 'myCustomTitle'
      }
    });
  }

}
