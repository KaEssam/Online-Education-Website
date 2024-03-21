import { Component } from '@angular/core';
import { CourseItemComponent } from '../../course-item/course-item.component';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CourseItemComponent],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent {

}
