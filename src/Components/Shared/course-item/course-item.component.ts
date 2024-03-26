import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../../Services/courses.service';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers: [CoursesService],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {
  allCourses: any = [];
  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }
}
