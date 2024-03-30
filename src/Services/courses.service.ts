import { HttpClient } from '@angular/common/http';
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


  private readonly DB_URL = "http://localhost:3000/courses";

  constructor(private readonly Client: HttpClient) { }

  getAllCourses() {
    return this.Client.get(this.DB_URL);
  }

  getCoursesByCategory(category: string) {
    const DB_URL_Category = `http://localhost:3000/courses?category=${category}`;
    return this.Client.get(DB_URL_Category);
  }

  getCourseById(id:any){
    return this.Client.get(this.DB_URL+"/"+id)
  }
  
}
