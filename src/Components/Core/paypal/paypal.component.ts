import { Course } from './../../../Services/course';
import { CartComponent } from './../cart/cart.component';
import { Component } from '@angular/core';
import { PayPalService } from '../../../Services/paypal.service';
import { TotalPriceService } from '../../../Services/total-price.service';

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
  providers: [PayPalService, TotalPriceService],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css',
})
export class PaypalComponent {
  constructor(
    private payPalService: PayPalService,
    private totalPriceService: TotalPriceService
  ) {}

  value: any;
  Courses: any;

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          this.totalPriceService.totalPrice$.subscribe((val) => {
            this.value = val;
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '',
                    currency_code: 'USD',
                  },
                },
              ],
            });
          });
        },
        onApprove: (data, actions) => {
          this.totalPriceService.courseList$.subscribe((crsList) => {
            this.Courses = crsList;
            this.payPalService
              .capturePayment(data.orderID, this.Courses)
              .subscribe({
                next: () => {
                  window.alert(
                    'Payment successful! Thank you for your purchase.'
                  );
                },
              });
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render('#paypal-button-container');
  }
}
