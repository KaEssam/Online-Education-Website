import { Component } from '@angular/core';
import { CourseItemComponent } from '../../course-item/course-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CourseItemComponent,RouterModule],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent {

}
