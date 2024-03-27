import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import AOS from 

'aos'; //AOS - 1



@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  ngOnInit(): void {
    AOS.init();
    AOS.refresh();
  }
}
