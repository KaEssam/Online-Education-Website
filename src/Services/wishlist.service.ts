import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISH_URL = "https://skillgro.runasp.net/api/WishList"; // Separate URL for cart operations
  constructor(private readonly Client: HttpClient) { }

  addToWish(product: any) {
    return this.Client.post(this.WISH_URL, product); // Post product to the cart URL
  }

  getWishItems() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':"Bearer "+localStorage.getItem('currentUser') || ""
      })
    };
    return this.Client.get(this.WISH_URL/*, httpOptions*/); // Fetch items from the cart URL
  }

  private getCookie(name: string): string {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
  }

  deleteFromCart(id: any) {
    return this.Client.delete(this.WISH_URL + "/" + id);
  }

  
}
