import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

private baseUrl = 'https://skillgro.runasp.net';

  constructor(private http: HttpClient) { }

SignUp(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/student/account/register`, newUser);
  }
  
  signIn(email: string, password: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers you need
    });
    return this.http.post<any>(`${this.baseUrl}/api/student/account/login`, { email, password });
  }

}





