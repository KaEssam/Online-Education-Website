import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly DB_URL = "http://localhost:3000/products";

  constructor(private readonly Client:HttpClient) { }

  getAllProducts(){
    return this.Client.get(this.DB_URL);
  }
}
