import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos'; //AOS - 1

@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent {
  ngOnInit(): void {
    AOS.init();
    AOS.refresh();
  }
}
