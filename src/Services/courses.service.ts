import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly DB_URL = "http://localhost:3000/courses";

  constructor(private readonly Client:HttpClient) { }

  getAllCourses(){
    return this.Client.get(this.DB_URL);
  }
}
