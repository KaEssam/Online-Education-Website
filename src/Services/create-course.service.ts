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

    console.log(course);

    return this.http.post<Course>(this.apiUrl, course, httpOptions);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + '/' + id);
  }

  updateCourse(course: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put<Course>(this.apiUrl + '/' + course.id, course, httpOptions);
  }

  deleteCourse(id: number): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.delete<Course>(this.apiUrl + '/' + id, httpOptions);
  }


  deleteSection(courseId: number, sectionId: number): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.delete<Course>(this.apiUrl + '/' + courseId + '/Section/' + sectionId, httpOptions);
  }


  deleteContent(contentId: number): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.delete<Course>(this.apiUrl + '/Content/' + contentId, httpOptions);
  }
}
