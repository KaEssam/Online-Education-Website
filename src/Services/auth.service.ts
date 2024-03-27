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

  // https://skillgro.runasp.net

  DB_URL = "https://skillgro.runasp.net";
  constructor(private myClient: HttpClient) { }


  SignIn(data: any): Observable<any> {
    return this.myClient.post(`${this.DB_URL}/api/student/account/login`, data);
  }

  SignUp(user: any) {
    return this.myClient.post(`${this.DB_URL}/api/student/account/register`, user);

  }

}



