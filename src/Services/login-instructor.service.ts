import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


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
export class LoginInstructorService {

   private baseUrl = 'http://skillgro.runasp.net';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient /*, public jwtHelper: JwtHelperService*/
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  Login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/instructor/account/login`, {
      email: username,
      password: password,
    });
  }

}
