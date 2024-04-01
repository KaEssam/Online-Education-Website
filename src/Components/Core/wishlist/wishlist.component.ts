import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WishlistService } from '../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [WishlistService, CartService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  id: any;
  Products: any = [];

  constructor(private wishlistService: WishlistService, private cartService: CartService, private router: Router, private Activated: ActivatedRoute) {
    this.id = this.Activated.snapshot.params["id"];
  }


  ngOnInit(): void {
    this.loadWishItems();
  }

  loadWishItems() {
    this.wishlistService.getWishItems().subscribe({
      next: (data) => {
        // setTimeout(() => {}, 1000);
        this.Products = data;
        console.log(data);

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

  deleteFromWish(id: any) {
    this.confirmDelete(id);

  }

  addToCart(id: any) {
    this.cartService.addToCart(id).subscribe(
      () => {
        // Optional: You can handle success actions here
        console.log('Product added to cart successfully.');
        this.confirmAddToCart();
        
                    this.wishlistService.deleteFromCart(id).subscribe({
      next: (data) => {
        // Optional: Handle success actions
        console.log('Product deleted from cart successfully.', data);
        // Refresh cart items after deletion
        this.loadWishItems();
      },
      error: (err) => {
        // Handle error**********************
        console.error('Error deleting product from cart:', err);
      }
    });
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

  confirmDelete(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success customBtn",
        cancelButton: "btn btn-danger customBtn",
        icon: 'myCustomIcon',
        title: 'myCustomTitle'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are You Sure!",
      icon: "warning",
      width: '450px',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          icon: "success",
          width: '450px',

        });
            this.wishlistService.deleteFromCart(id).subscribe({
      next: (data) => {
        // Optional: Handle success actions
        console.log('Product deleted from cart successfully.', data);
        // Refresh cart items after deletion
        this.loadWishItems();
      },
      error: (err) => {
        // Handle error**********************
        console.error('Error deleting product from cart:', err);
      }
    });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          icon: "error",
          width: '450px',
        });
      }
    });
  }

}
