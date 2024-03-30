import { routes } from "./../../../app/app.routes";
import {Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { PaymentService } from '../../../Services/payment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";


declare var paypal: any;

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  providers: [PaymentService],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  exportAs: 'checkOut'
})
export class CheckOutComponent implements OnInit{
  activeTab = 'credit-card';
  checkoutForm: any;
  amount=0;

  @ViewChild('paypalRef', { static: true }) paypalRef!: ElementRef;


  constructor(private fb: FormBuilder, private PaymentService: PaymentService, private router: Router) {}

  ngAfterViewInit(): void {
  this.loadPayPalSDK().then(() => {
    this.initializePayPalButtons();
  });
}

loadPayPalSDK(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = '           http://www.paypal.com/sdk/js?currency=USD&client-id=AbZeNOzbl6ovyTR1WJJ2M4QWq7gij-mtMkBB2UBeFhW6a4VQDtqnMyIKb8gb__ur1UjaVN8P5Tw1KG8O';
    scriptElement.onload = (event: Event) => resolve();
    scriptElement.onerror = reject;
    document.body.appendChild(scriptElement);
  });
}

initializePayPalButtons(): void {
  const amount = this.PaymentService.totalAmount; // Assuming this gets the total amount

  // Initialize PayPal buttons
  paypal.Buttons({
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amount
          }
        }]
      });
    },
    onApprove: (data: any, actions: any) => {
      return actions.order.capture().then((details: any) => {
        console.log('Transaction completed by ' + details.payer.name.given_name);
      });
    },
    onError: (err: any) => {
      console.error('Error occurred:', err);
    }
  }).render(this.paypalRef.nativeElement);
}

  ngOnInit() : void{
    this.amount = this.PaymentService.totalAmount;
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount,
              },
            },
          ],
        });
      },
      onApprove:(data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onError: (err: any) => {
        console.log(err);
      }
    }).render(this.paypalRef.nativeElement);
  }


    // window.paypal.Buttons().render(this.paypalRef.nativeElement);

    // paypal.button({
    //   createOrder: (data: any, actions:any) => {
    //     return actions.order.create({
    //       purchase_units: [
    //         {
    //           amount: {
    //             value: '100.00'
    //           }
    //         }
    //       ]
    //     });
    //   },
    //   onApprove: async (data: any, actions:any) => {
    //     const order = await actions.order.capture();
    //     console.log(order);
    //   },
    //   onError: (err: any) => {
    //     console.log(err);
    //   }
    // })
    //   .render(this.paypalRef.nativeElement);
  

  initializeForm() {
    this.checkoutForm = this.fb.group({
      creditCard: this.fb.group({
        cardOwner: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
        cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
        expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
        expiryYear: ['', [Validators.required, Validators.min(2021), Validators.max(2030), Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      }), 
      netBanking: this.fb.group({
        walletNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      })
    });
  }

  get isValidCardOwner() {
    return this.checkoutForm.get('creditCard.cardOwner')?.valid || this.checkoutForm.get('creditCard.cardOwner')?.untouched;
  }

  get isValidCardNumber() {
    return this.checkoutForm.get('creditCard.cardNumber')?.valid || this.checkoutForm.get('creditCard.cardNumber')?.untouched;
  }

  get isValidExpiryMonth() {
    return this.checkoutForm.get('creditCard.expiryMonth')?.valid || this.checkoutForm.get('creditCard.expiryMonth')?.untouched;
  }

  get isValidCvv() {
    return this.checkoutForm.get('creditCard.cvv')?.valid || this.checkoutForm.get('creditCard.cvv')?.untouched;
  }

  get isValidExpiryYear() {
    return this.checkoutForm.get('creditCard.expiryYear')?.valid || this.checkoutForm.get('creditCard.expiryYear')?.untouched;
  }

  get isValidWalletNumber() {
    return this.checkoutForm.get('netBanking.walletNumber')?.valid || this.checkoutForm.get('netBanking.walletNumber')?.untouched;
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.PaymentService.processPayment(this.checkoutForm.value);
    }
  }
}

