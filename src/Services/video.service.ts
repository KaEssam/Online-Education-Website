import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Section {
  title: string;
  contents: Video[];
}

interface Video {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private DB_URL = "http://skillgro.runasp.net";  // Replace with your API URL

  constructor(private http: HttpClient) { }

  getCourseSections(id:any): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.DB_URL}/api/CourseWithSection/${id}`);
  }
}
