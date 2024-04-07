import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateCourseService } from '../../../Services/create-course.service';

@Component({
  selector: 'app-instructor-sidebar',
  standalone: true,
  imports: [RouterModule],
  providers: [CreateCourseService],
  templateUrl: './instructor-sidebar.component.html',
  styleUrl: './instructor-sidebar.component.css'
})
export class InstructorSidebarComponent {

  constructor(private createCourseService:CreateCourseService) { }

  Courses: any = [];

  ngOnInit(): void {
    this.getAllCreatedCourses();
  }

  getAllCreatedCourses() {
    this.createCourseService.getAllCourses().subscribe({
      next: (data) => {
        console.log(data);
        this.Courses = data;
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  
}
}
