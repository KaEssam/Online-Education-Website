import { map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PaypalComponent } from '../paypal/paypal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, PaypalComponent],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  Products: any = [];
  // id: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private Activated: ActivatedRoute
  ) {
    // this.id = this.Activated.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.Products = data;
        this.calculateTotalPrice();
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errorMessage: err.message as string },
        ]);
      },
    });
  }

  // Define a trackBy function to improve performance
  trackByFn(index: number, item: any) {
    return item.id; // Assuming each product has an 'id' property
  }

  deleteFromCart(id: any) {
    this.confirmDelete(id);
  }

  totalPrice: number = 0; // Initialize total price to zero
  calculateTotalPrice() {
    this.totalPrice = this.Products.reduce(
      (total: number, product: any) => total + product.coursePrice,
      0
    );
  }

  confirmDelete(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success customBtn',
        cancelButton: 'btn btn-danger customBtn',
        icon: 'myCustomIcon',
        title: 'myCustomTitle',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are You Sure!',
        icon: 'warning',
        width: '450px',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            icon: 'success',
            width: '450px',
          });
          this.cartService.deleteFromCart(id).subscribe({
            next: (data) => {
              // Optional: Handle success actions
              console.log('Product deleted from cart successfully.', data);
              //confirm delete
              // Refresh cart items after deletion
              this.loadCartItems();
            },
            error: (err) => {
              // Handle error**********************
              console.error('Error deleting product from cart:', err);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            icon: 'error',
            width: '450px',
          });
        }
      });
  }
}
