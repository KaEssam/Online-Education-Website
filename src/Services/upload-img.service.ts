import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {

    private apiUrl = 'https://localhost:7115';
  constructor(private http: HttpClient) { }

  uploadImg(formData:FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };


    return this.http.post(`${this.apiUrl}/api/Video/UploadImage`, formData, httpOptions);
}
}
