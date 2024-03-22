import { Component, ElementRef, Renderer2 } from '@angular/core';
import { VideoPlaylistComponent } from '../video-playlist/video-playlist.component';

@Component({
  selector: 'app-after-enroll',
  standalone: true,
  imports: [VideoPlaylistComponent],
  templateUrl: './after-enroll.component.html',
  styleUrl: './after-enroll.component.css'
})
export class AfterEnrollComponent {
  // constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  // ngAfterViewInit(): void {
  //   const links = this.elementRef.nativeElement.querySelectorAll('.video-playlist .link');
  //   links.forEach((link: Element) => {
  //     this.renderer.listen(link, 'click', (event: Event) => {
  //       const parent = link.parentNode;
  //       if (parent) {
  //         const siblings = Array.from(parent.children).filter(sibling => sibling !== link);
  //         siblings.forEach(sibling => this.renderer.removeClass(sibling, 'active'));
  //         this.renderer.addClass(link, 'active');
  //       }
  //       event.preventDefault();
  //     });
  //   });
  // }




  
}
