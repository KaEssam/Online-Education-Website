import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import AOS from 'aos'; //AOS - 1


@Component({
  selector: 'app-fact-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fact-section.component.html',
  styleUrl: './fact-section.component.css'
})
export class FactSectionComponent {

  ngOnInit(): void {
    AOS.init();
    AOS.refresh();
  }

  // @ViewChild('container') containerRef!: ElementRef<HTMLElement>;
  // sections: { targetValue: number; imageUrl: string; description: string; currentValue: number }[] = [];

  // intervals: Map<HTMLElement, number> = new Map(); // Using a Map for intervals to associate with sections

  // constructor(private renderer: Renderer2) {}

  // ngOnInit() {
  //   this.sections = [
  //     {
  //       imageUrl: "assets/Test img/webinar.png",
  //       targetValue: 1500,
  //       description: "Students Enrolled",
  //       currentValue: 0
  //     },
  //     {
  //       imageUrl: "assets/img/graduation.png",
  //       targetValue: 850,
  //       description: "Top Class Courses",
  //       currentValue: 0
  //     },
  //     {
  //       imageUrl: "assets/img/countries.png",
  //       targetValue: 55,
  //       description: "World Countries",
  //       currentValue: 0
  //     },
  //     {
  //       imageUrl: "assets/img/trophy.png",
  //       targetValue: 10,
  //       description: "Award We Received",
  //       currentValue: 0
  //     }
  //   ];
  // }

  // ngAfterViewInit() {
  //   window.addEventListener('scroll', this.handleScroll.bind(this));
  // }

  // ngOnDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll.bind(this));
  //   this.intervals.forEach(intervalId => clearInterval(intervalId));
  // }

  // handleScroll() {
  //   const windowHeight = window.innerHeight;
  //   this.sections.forEach((section, index) => {
  //     const sectionElement = this.containerRef.nativeElement.children[index];
  //     if (sectionElement) {
  //       const sectionTop = sectionElement.getBoundingClientRect().top;
  //       if (sectionTop >= 0 && sectionTop <= windowHeight) {
  //         this.startCounter(section, sectionElement);
  //       } else {
  //         const intervalId = this.intervals.get(sectionElement);
  //         if (intervalId) {
  //           clearInterval(intervalId);
  //           this.intervals.delete(sectionElement);
  //         }
  //       }
  //     }
  //   });
  // }

  // startCounter(section: { targetValue: number; currentValue: number }, sectionElement: Element) {
  //   const counterElement = sectionElement.querySelector('.count') as HTMLElement;
  //   let counterValue = section.currentValue;
  //   const targetValue = section.targetValue;
  
  //   const intervalId = setInterval(() => {
  //     counterValue++;
  //     counterElement.textContent = counterValue.toString();
  //     if (counterValue === targetValue) {
  //       clearInterval(intervalId);
  //       this.intervals.delete(sectionElement);
  //     }
  //   }, 7);
  
  //   this.intervals.set(sectionElement, intervalId);
  // }
  
}
