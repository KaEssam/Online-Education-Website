import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  private apiUrl = 'http://localhost:3000/addedcourse';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, this.httpOptions);
  }
}
