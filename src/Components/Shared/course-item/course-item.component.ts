
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../../Services/courses.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, MatPaginatorModule],
  providers: [CoursesService, CartService, WishlistService],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})


export class CourseItemComponent {
  allCourses: any = [];
  totalItems = 0;
  pageSize = 4;
  currentPage = 0;
  items: any

  @Output() pageEmitter = new EventEmitter<PageEvent>();

  constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute, private cartService: CartService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
        this.totalItems = this.allCourses.length;
        // event: PageEvent = new PageEvent
        // event.length = this.totalItems;
        // event.pageIndex = 0;
        // event.pageSize = this.pageSize;
        // this.pageEmitter.emit(event);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  getData(pageIndex: number, pageSize: number) {
    return this.allCourses.slice(pageIndex * pageSize, (pageIndex * pageSize) + pageSize);
  }


  pageChanged(event: PageEvent) {
    // setTimeout(()=>{}, 10000)
    this.currentPage = event.pageIndex
    this.items = this.getData(event.pageIndex, this.pageSize);
    console.log(event)
  }



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
