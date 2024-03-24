import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  DB_URL = "http://localhost:3000";
  constructor(private myClient: HttpClient) { }


  SignIn(data: any): Observable<any> {
    return this.myClient.post(`${this.DB_URL}/signIn`, data);
  }

  SignUp(user: any) {
    return this.myClient.post(this.DB_URL, user);

  }

}



