import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private readonly DB_URL = "https://skillgro.runasp.net";

  // constructor(private readonly Client: HttpClient) { }

  // getAllCourses() {
  //   return this.Client.get(this.DB_URL+"/api/Categories");
  // }

  // getCoursesByCategory(category: string) {
  //   const DB_URL_Category = /*`http://localhost:3000/courses?category=${category}`*/this.DB_URL+"/api/Categories";
  //   return this.Client.get(DB_URL_Category);
  // }


  private DB_URL = "http://skillgro.runasp.net";

  constructor(private readonly Client: HttpClient) { }

  getAllCourses() {
    return this.Client.get(`${this.DB_URL}/api/CourseHome`);
  }

  getCoursesByCategory(category: string) {
    return this.Client.get(`${this.DB_URL}/api/CategoryWithCourse/${category}`);
  }

  getCourseById(id:any){
    return this.Client.get(`${this.DB_URL}/api/CourseWithSection/${id}`)
  }

  getPaginatedData(pageIndex: number, pageSize: number): Observable<any> {
    const startIndex = pageIndex * pageSize;
    return this.Client.get<any>(`${this.DB_URL}/api/CourseWithSection?_start=${startIndex}&_limit=${pageSize}`);
  }

  
}
