import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private readonly CART_URL = "http://localhost:3000/cart"; // Separate URL for cart operations
  constructor(private readonly Client:HttpClient) { }

  addToCart(product:any){
    return this.Client.post(this.CART_URL, product); // Post product to the cart URL
  }

  getCartItems(){
    return this.Client.get(this.CART_URL); // Fetch items from the cart URL
  }

  deleteFromCart(id: any) {
    return this.Client.delete(this.CART_URL+"/"+id);
  }



  // private readonly CART_URL = "https://skillgro.runasp.net"; // Separate URL for cart operations
  // constructor(private readonly Client:HttpClient) { }

  // addToCart(product:any){
  //   return this.Client.post(this.CART_URL+"/api/Cart", product); // Post product to the cart URL
  // }

  // getCartItems(){
  //   return this.Client.get(this.CART_URL+"/api/Cart"); // Fetch items from the cart URL
  // }

  // deleteFromCart(id: any) {
  //   return this.Client.delete(this.CART_URL+"/api/Cart/"+id);
  // }

}
