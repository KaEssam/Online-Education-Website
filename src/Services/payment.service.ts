import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
constructor() { }


totalAmount = 0;
  processPayment(formData: any) {
    switch (formData.activeTab) {
      case 'credit-card':
        // Implement credit card processing logic here (usually interacting with a payment API)
        console.log('Credit Card Payment:', formData.creditCard);
        break;
      case 'paypal':
        // Simulate redirect to PayPal
        console.log('Redirecting to PayPal...');
        break;
      case 'net-banking':
        // Simulate net banking payment processing 
        console.log('Net Banking Payment:', formData.netBanking);
        break;
    }
  }
}
