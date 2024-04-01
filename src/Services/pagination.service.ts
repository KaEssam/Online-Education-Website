import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private readonly Client: HttpClient) { }
  private readonly dbUrl = "http://localhost:3000/courses"
  getPaginatedData(page: number, itemsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.Client.get<any>(`${this.dbUrl}?${params.toString()}`);
  }
}
