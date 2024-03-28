import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly DB_URL = "https://skillgro.runasp.net";

  constructor(private readonly Client:HttpClient) { }

  getAllProducts(){
    return this.Client.get(this.DB_URL+"/api/CourseWithSection");
  }

  getProductById(id:any){
    return this.Client.get(/*this.DB_URL+"/"+id*/this.DB_URL+"/api/CourseWithSection")
  }
  
}
