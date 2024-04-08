import { Course } from './../../../Services/course';
import { CartComponent } from './../cart/cart.component';
import { Component } from '@angular/core';
import { PayPalService } from '../../../Services/paypal.service';
import { CartService } from '../../../Services/cart.service';
import Swal from 'sweetalert2';

interface PayPalWindow extends Window {
  paypal?: any;
}

declare var paypal: {
  Buttons: (arg0: {
    createOrder: (data: any, actions: any) => any;
    onApprove: (data: any, actions: any) => void;
    onError: (err: any) => void;
  }) => { (): any; new (): any; render: { (arg0: string): void; new (): any } };
};

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [CartComponent],
  providers: [PayPalService, CartService],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css',
})
export class PaypalComponent {
  constructor(
    private payPalService: PayPalService,
    private cartService: CartService
  ) {}

  Products: any = [];
  totalPrice: number = 0;
  Courses: any;

  ngOnInit(): void {
    this.loadCartItems();

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${this.totalPrice}`,
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          this.payPalService
            .capturePayment(data.orderID, this.Courses)
            .subscribe({
              next: () => {
                Swal.fire({
                  icon: "success",
                  title: "Payment successful! Thank you for your purchase.",
                  showConfirmButton: false,
                  timer: 1500,
                  position: "top-end",
                  // toast: true,
                  customClass: {
                    title: 'myCustomTitle'
                  }
                });
              },
            });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render('#paypal-button-container');
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.Products = data;
        this.calculateTotalPrice();
        this.generateCoursesList();
      },
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.Products.reduce(
      (total: number, product: any) => total + product.coursePrice,
      0
    );
  }

  generateCoursesList() {
    this.Courses = this.Products.map((product: any) => product.courseId);
  }
}
