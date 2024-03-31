import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly WISH_URL = 'https://skillgro.runasp.net'; // Separate URL for cart operations
  constructor(private readonly Client: HttpClient) {}

  addToWish(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.post(`${this.WISH_URL}/api/WishList/${id}`,httpOptions); // Post product to the cart URL
  }

  getWishItems() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.Client.get(`${this.WISH_URL}/api/WishList`, httpOptions); // Fetch items from the cart URL
  }

  deleteFromCart(id: any) {
    return this.Client.delete(`${this.WISH_URL}/api/WishList/${id}`);
  }
}
