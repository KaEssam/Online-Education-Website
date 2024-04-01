import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


  private DB_URL = "https://skillgro.runasp.net";

  constructor(private readonly Client: HttpClient) { }

  getAllCourses() {
    return this.Client.get(`${this.DB_URL}/api/CourseWithSection`);
  }

  getCoursesByCategory(category: string) {
    return this.Client.get(`${this.DB_URL}/api/CourseWithSection/${category}`);
  }

  getCourseById(id:any){
    return this.Client.get(`${this.DB_URL}/api/CourseWithSection/${id}`)
  }

  
}
