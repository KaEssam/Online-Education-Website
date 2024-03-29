import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly DB_URL: string = "https://skillgro.runasp.net/api/CourseWithSection";

  constructor(private readonly Client: HttpClient) { }

  getAllEvents() {
    return this.Client.get(this.DB_URL);
  }
}
