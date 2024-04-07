import { Component } from '@angular/core';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar/student-sidebar.component';
import { StudentContentComponent } from './student-content/student-content/student-content.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [StudentSidebarComponent,StudentContentComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {

  

}
