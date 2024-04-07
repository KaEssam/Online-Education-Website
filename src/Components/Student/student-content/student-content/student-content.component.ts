import { StudentCourseService } from "./../../../../Services/student-course.service";
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { routes } from "../../../../app/app.routes";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-student-content',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [StudentCourseService],
  templateUrl: './student-content.component.html',
  styleUrl: './student-content.component.css'
})
export class StudentContentComponent {

  id: any;
  Courses: any;

  constructor(private studentCourseService:StudentCourseService, private router: Router, private Activated: ActivatedRoute,) {
    this.id = this.Activated.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.viewAllCourses();
  }

  viewAllCourses() {
    this.studentCourseService.getAllCourses().subscribe({
      
      next: (data) => {
        console.log(data);
        this.Courses = data;
        
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }

  viewCourse(id: any) {
        this.studentCourseService.getAllCourses().subscribe({
          
      next: (data) => {
        console.log(data);
        this.Courses = data;
        
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })

}
  
  }

