import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
//https://skillgro.runasp.net/api/Cart/{courseId} ==> post
//https://skillgro.runasp.net/api/Cart ==> get
//https://skillgro.runasp.net/api/Cart/{courseId} ==> delete


 private CART_URL = "https://localhost:7115"; // Separate URL for cart operations

  constructor(private readonly Client:HttpClient) { }
  addToCart(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.post(`${this.CART_URL}/api/Cart/${id}`, undefined, httpOptions); // Post product to the cart URL
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.delete(`${this.CART_URL}/api/Cart/${id}`,httpOptions); // Delete product from the cart URL
  }
}
