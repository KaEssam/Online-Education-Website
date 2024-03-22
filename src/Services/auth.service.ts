import { HttpClient } from '@angular/common/http';
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
createUser(value: any) {
  throw new Error('Method not implemented.');
}

DB_URL = "http://localhost:3000/users";
constructor(private readonly myClient:HttpClient) { }


SignIn(email: string, password: string): Observable<User> {
  return this.myClient.get<User>(`${this.DB_URL}?email=${email}&password=${password}`);
}

SignUp(user: any){
  return this.myClient.post(this.DB_URL, user);

}
  
  }



