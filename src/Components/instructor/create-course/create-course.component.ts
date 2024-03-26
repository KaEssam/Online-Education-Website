import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
currentStep: number = 1;
  course: any = {
    title: '',
    category: '',
    description: '',
    curriculum: []
  };

  constructor() { }

  ngOnInit(): void {
  }

  nextStep() {
    this.currentStep++;
  }

  addSection() {
    const sectionName = prompt("Enter section name:");
    if (sectionName) {
      this.course.curriculum.push({ name: sectionName, content: [] });
    }
  }

  editSection(section: any) {
    const newName = prompt("Enter new section name:", section.name);
    if (newName) {
      section.name = newName;
    }
  }

  deleteSection(section: any) {
    const index = this.course.curriculum.indexOf(section);
    if (index !== -1) {
      this.course.curriculum.splice(index, 1);
    }
  }
}
