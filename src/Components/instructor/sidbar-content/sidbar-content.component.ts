import { CreateCourseService } from "./../../../Services/create-course.service";
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-sidbar-content',
  standalone: true,
  imports: [RouterModule],
  providers: [CreateCourseService],
  templateUrl: './sidbar-content.component.html',
  styleUrl: './sidbar-content.component.css'
})
export class SidbarContentComponent {

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

deleteCourse(id: number) {
 Swal.fire({
    title: 'Are you sure?',
    text: "This action will remove the content from the current view.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
if (result.isConfirmed) {
      this.createCourseService.deleteCourse(id).subscribe({
    next: (data) => {
      console.log(data);
      this.getAllCreatedCourses();
      Swal.fire(
          'Deleted!',
          'Your content has been removed (temporarily).',
          'success'
        );
    },
    error: (err) => {
      console.log(err);
    }
  });
    }
  });
  
  }


  updateCourse(id: number) {


}

}

