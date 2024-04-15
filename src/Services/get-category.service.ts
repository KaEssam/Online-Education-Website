import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetCategoryService {
  private DB_URL = 'https://skillgro.runasp.net';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${this.DB_URL}/api/Categories`);
  }
}
