import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  private apiUrl = 'https://skillgro.runasp.net/api/CourseWithSection';

  

  constructor(private http: HttpClient) { }

  createCourse(course: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post<Course>(this.apiUrl, course, httpOptions);
  }
}
