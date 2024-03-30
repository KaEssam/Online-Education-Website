import { Component } from '@angular/core';

interface PayPalWindow extends Window {
  paypal?: any;
}

declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => any; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: string): void; new(): any; }; }; };


@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {
  constructor() { }

  ngOnInit(): void {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00' 
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details: any) => {
          console.log(details);
         
          
            window.alert('Payment successful! Thank you for your purchase.');
        
        });
      },
      onError: (err) => {
        console.log(err);
       
      }
    }).render('#paypal-button-container');
}
}






