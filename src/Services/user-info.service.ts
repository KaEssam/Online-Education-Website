import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

   private DB_URL = "https://localhost:7115";
  constructor(private readonly Client: HttpClient) { }

  getUserInfo() {
        const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.get(`${this.DB_URL}/api/Userinfo`, httpOptions);
  }
}


