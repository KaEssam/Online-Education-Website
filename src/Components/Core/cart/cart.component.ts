import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  providers:[CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Products: any = [];
  id: any;
  
  constructor(private cartService: CartService, private router: Router, private Activated: ActivatedRoute) {
    this.id = this.Activated.snapshot.params["id"];
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
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }

  // Define a trackBy function to improve performance
  trackByFn(index: number, item: any) {
    return item.id; // Assuming each product has an 'id' property
  }



  deleteFromCart(id:any) {
    this.confirmDelete();
    this.cartService.deleteFromCart(id).subscribe({
      next: (data) =>{
        // Optional: Handle success actions
        console.log('Product deleted from cart successfully.',data);
        // Refresh cart items after deletion
        this.loadCartItems();
      },
      error: (err) => {
        // Handle error**********************
        console.error('Error deleting product from cart:', err);
      }
  });
  }

  totalPrice: number = 0; // Initialize total price to zero
  calculateTotalPrice() {
    // Iterate through cart items and sum up prices
    this.totalPrice = this.Products.reduce((total:number, product:any) => total + product.price, 0);
  }


  confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true, // Optional: Reverse button order
      customClass: { // Apply Bootstrap button classes
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false // Disable default Swal button styling
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle successful deletion (e.g., call an API to delete data)
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error'
        });
      }
    });
  }
  



}
