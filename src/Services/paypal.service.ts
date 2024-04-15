import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PayPalService {
  private readonly APP_URL = 'https://skillgro.runasp.net'; // Separate URL for cart operations
  constructor(private readonly Client: HttpClient) {}

  capturePayment(orderId: any, coursesList: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.Client.post(
      this.APP_URL + `/api/PayPal/CaptureOrder?orderId=${orderId}`,
      coursesList,
      httpOptions
    );
  }
}
