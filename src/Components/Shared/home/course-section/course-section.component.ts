import { Component } from '@angular/core';
import { CourseItemComponent } from '../../course-item/course-item.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoursesService } from '../../../../Services/courses.service';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CourseItemComponent,RouterModule,HttpClientModule],
  providers:[CoursesService],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent {
  Courses:any = [];
  constructor(private coursesService:CoursesService , private router:Router){ }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next:(data)=>{
        this.Courses = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errorMessage : err.message as string}]);
      }
    })
  }
}
