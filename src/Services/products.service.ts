import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly DB_URL = "http://localhost:3000/products";

  constructor(private readonly Client:HttpClient) { }

  getAllProducts(){
    return this.Client.get(this.DB_URL);
  }

  getProductById(id:any){
    return this.Client.get(this.DB_URL+"/"+id)
  }
  
}
