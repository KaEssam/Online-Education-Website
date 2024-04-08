import { Component } from '@angular/core';
import { use } from 'video.js/dist/types/tech/middleware';
import { UserInfoService } from '../../../../Services/user-info.service';

@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [],
  providers: [UserInfoService],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebarComponent {

  user: any;

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.viewUserInfo();
  }

  viewUserInfo() {
    this.userInfoService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }
}
