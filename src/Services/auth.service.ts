import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService {

// private baseUrl = 'https://skillgro.runasp.net';

//   constructor(private http: HttpClient) { }

// SignUp(newUser: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/api/student/account/register`, newUser);
//   }

//   signIn(email: string, password: string): Observable<any> {

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       // Add any other headers you need
//     });
//     return this.http.post<any>(`${this.baseUrl}/api/student/account/login`, { email, password });
//   }

// }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://skillgro.runasp.net';



  constructor(
    private http: HttpClient /*, public jwtHelper: JwtHelperService*/
  ) {
  }


  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/student/account/login`, {
      email: username,
      password: password,
    });

  }

  SignUp(userData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/student/account/register`,
      userData
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  // isLoggedIn() {
  //   const currentUser = localStorage.getItem('token');
  //   const isLoggedIn = currentUser ? true : false;
  //   // return token ? !this.jwtHelper.isTokenExpired(token) : false;
  //   return isLoggedIn;
  // }

  isStudent() {
    const currentUser = localStorage.getItem('token');
    const isLoggedIn = currentUser ? true : false;
    const type = localStorage.getItem('type');
    return type === 'student'&&isLoggedIn;
  }

  isStudent$ = new BehaviorSubject<boolean>(false);
}
