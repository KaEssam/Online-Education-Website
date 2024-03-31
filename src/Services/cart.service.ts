import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private readonly CART_URL = "https://skillgro.runasp.net"; // Separate URL for cart operations
  constructor(private readonly Client:HttpClient) { }
  addToCart(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.post(`${this.CART_URL}/api/Cart/${id}`,httpOptions); // Post product to the cart URL
  }

  getCartItems(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.get(`${this.CART_URL}/api/Cart`, httpOptions); // Fetch items from the cart URL
  }

  deleteFromCart(id: any) {
    return this.Client.delete(`${this.CART_URL}/api/Cart/${id}`);
  }


}
