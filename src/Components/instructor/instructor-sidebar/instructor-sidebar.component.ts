import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateCourseService } from '../../../Services/create-course.service';
import { UserInfoService } from '../../../Services/user-info.service';

@Component({
  selector: 'app-instructor-sidebar',
  standalone: true,
  imports: [RouterModule],
  providers: [CreateCourseService,UserInfoService],
  templateUrl: './instructor-sidebar.component.html',
  styleUrl: './instructor-sidebar.component.css'
})
export class InstructorSidebarComponent {

  constructor(private createCourseService:CreateCourseService, private UserInfoService: UserInfoService) { }

  Courses: any = [];
  user: any;

  ngOnInit(): void {
    this.getAllCreatedCourses();
    this.viewUserInfo();
  }

      viewUserInfo() {
    this.UserInfoService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err.message);
      }
    })
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
