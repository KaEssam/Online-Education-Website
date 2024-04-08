import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  //https://skillgro.runasp.net/api/WishList/{courseId} ==> post
  //https://skillgro.runasp.net/api/WishList ==> get
  //https://skillgro.runasp.net/api/WishList/{courseId} ==> delete
  
  private readonly WISH_URL = 'https://localhost:7115'; // Separate URL for cart operations
  constructor(private readonly Client: HttpClient) {}

  addToWish(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.post(`${this.WISH_URL}/api/WishList/${id}`, undefined, httpOptions); // Post product to the cart URL
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.delete(`${this.WISH_URL}/api/WishList/${id}`,httpOptions);
  }
}
