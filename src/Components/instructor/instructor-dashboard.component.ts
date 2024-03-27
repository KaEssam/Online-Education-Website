import { Component } from '@angular/core';
import { InstructorSidebarComponent } from './instructor-sidebar/instructor-sidebar.component';
import { SidbarContentComponent } from './sidbar-content/sidbar-content.component';
import { CreateCourseComponent } from './create-course/create-course.component';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [InstructorSidebarComponent,SidbarContentComponent,CreateCourseComponent],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {

}
