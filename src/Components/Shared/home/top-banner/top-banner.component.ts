import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; //AOS - 1

@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent {
  ngOnInit(): void {
    AOS.init();
    AOS.refresh();
  }
}
