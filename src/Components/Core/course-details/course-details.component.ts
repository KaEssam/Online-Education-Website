import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';
import AOS from 'aos'; //AOS - 1
import { CoursesService } from '../../../Services/courses.service';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule,HttpClientModule],
  providers: [CoursesService,CartService,WishlistService],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  id: any;
  Course: any;
  Courses: any = [];
  displayedCourses: any[] = [];

  constructor(private courseService: CoursesService, private router: Router, private Activated: ActivatedRoute,private cartService: CartService,private wishlistService: WishlistService) {
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

    // this.courseService.getAllCourses().subscribe({
    //   next: (data) => {
    //     this.Courses = data;
    //     this.displayedCourses = this.Courses.slice(0, 4);

    //   },
    //   error: (err) => {
    //     this.router.navigate(['/Error', { errorMessage: err.message as string }]);
    //   }
    // })
  }

  // counter = signal(1);
  // plus() {
  //   this.counter.update(num => ++num);
  // }
  // minus() {
  //   this.counter.update(num => num > 0 ? --num : num);

  // }



  addToCart(Course: any) {
    this.cartService.addToCart(Course).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Course added to cart successfully.');
        alert("added successfully!!")
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding Course to cart:', error);
      }
    );
  }


  addToWishlist(Course: any) {
    this.wishlistService.addToWish(Course).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Course added to cart successfully.');
        alert("added successfully!!")
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding Course to cart:', error);
      }
    );
  }



}
