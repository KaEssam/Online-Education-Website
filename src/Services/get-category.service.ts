import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {

  private DB_URL = "https://skillgro.runasp.net";

  constructor(private http: HttpClient ) {  }

  getAllCategories() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(`${this.DB_URL}/api/Categories`);
  }
}
