import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  // ngOnInit() {
  //   // Listen for collapse events
  //   const navbarCollapse = this.el.nativeElement.querySelector('.navbar-collapse');

  //   navbarCollapse.addEventListener('show.bs.collapse', () => {
  //     this.renderer.addClass(this.el.nativeElement.querySelector('.navbar-collapse'), 'shadow');
  //   });

  //   navbarCollapse.addEventListener('hide.bs.collapse', () => {
  //     this.renderer.removeClass(this.el.nativeElement.querySelector('.navbar-collapse'), 'shadow');
  //   });
  // }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('#navbar');
    if (window.pageYOffset > 0) {
      this.renderer.addClass(navbar, 'shadow');
    } else {
      this.renderer.removeClass(navbar, 'shadow');
    }
  }

  
}




