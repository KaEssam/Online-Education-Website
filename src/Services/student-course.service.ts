import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentCourseService {
  private DB_URL = 'https://skillgro.runasp.net';

  constructor(private readonly Client: HttpClient) {}

  getAllCourses() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.Client.get(`${this.DB_URL}/api/CourseWithSection`, httpOptions);
  }

  // getCourseById(id:any){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),
  //     }),
  //   };
  //   return this.Client.get(`${this.DB_URL}/api/CourseWithSection/${id}`, httpOptions)
  // }
}
