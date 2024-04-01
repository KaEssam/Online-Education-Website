import { PaginationComponent } from './../../Core/pagination/pagination.component';

import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../../Services/courses.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [HttpClientModule, RouterModule,PaginationComponent],
  providers: [CommonModule, CoursesService, CartService, WishlistService],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {
  allCourses: any = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalItems!: number;
  totalPages: number = 0; // Define totalPages property

  constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute, private cartService: CartService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
    // this.route.queryParams.subscribe(params => {
    //   this.currentPage = +params['page'] || 1; // Default to page 1 if 'page' parameter is not provided
    //   this.pageSize = +params['pageSize'] || 12; // Default page size to 12 if 'pageSize' parameter is not provided
    //   this.loadCourses();
    // });
  }

  // loadCourses() {
  //   this.coursesService.getPaginatedCourses(this.currentPage, this.pageSize).subscribe({
  //     next: (courses: any) => {
  //       this.pagCourses = courses;
  //       this.totalCourses = courses.length;
  //       this.totalPages = Math.ceil(this.totalCourses / this.pageSize);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching courses:', error);
  //     }
  //   });
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.router.navigate([], {
  //       relativeTo: this.route,
  //       queryParams: { page: this.currentPage + 1, pageSize: this.pageSize }
  //     });
  //   }
  // }

  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.router.navigate([], {
  //       relativeTo: this.route,
  //       queryParams: { page: this.currentPage - 1, pageSize: this.pageSize }
  //     });
  //   }
  // }

  // gotoPage(page: number) {
  //   if (page > 0 && page <= this.totalPages) {
  //     this.router.navigate([], {
  //       relativeTo: this.route,
  //       queryParams: { page: page, pageSize: this.pageSize }
  //     });
  //   }
  // }

  // getPaginationRange(): number[] {
  //   const numPagesToShow = 3; // Adjust the number of pages to show
  //   const start = Math.max(1, this.currentPage - Math.floor(numPagesToShow / 2));
  //   const end = Math.min(this.totalPages, start + numPagesToShow - 1);
  //   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  // }


  addToCart(id: any) {
    this.cartService.addToCart(id).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Product added to cart successfully.');
        this.confirmAddToCart();
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
        this.confirmAddToWish();
        // this.sendNumber();
      },
      (error) => {
        // Handle error
        console.error('Error adding product to cart:', error);
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
