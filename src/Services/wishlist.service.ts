import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISH_URL = "http://localhost:3000/wishlist"; // Separate URL for cart operations
  constructor(private readonly Client: HttpClient) { }

  addToWish(product: any) {
    return this.Client.post(this.WISH_URL, product); // Post product to the cart URL
  }

  getWishItems(){
    return this.Client.get(this.WISH_URL); // Fetch items from the cart URL
  }

  deleteFromCart(id: any) {
    return this.Client.delete(this.WISH_URL + "/" + id);
  }

}
