import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

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




