import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
currentStep: number = 1;
  course: any = {
    title: '',
    category: '',
    description: '',
    curriculum: [],
    price: null,
    status: 'draft'
  };
  newLecture: any = {
    title: '',
    media: null // You may need to adjust this depending on how you handle media uploads
  };

@ViewChild('addLectureModal') addLectureModal!: ElementRef;
  currentSection: any;

  constructor() {}

  ngOnInit(): void {}

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  goBack() {
    // Logic to navigate back to the courses page
    console.log('Navigating back to courses page');
  }

  addSection() {
    const sectionName = prompt("Enter section name:");
    if (sectionName) {
      this.course.curriculum.push({ name: sectionName, lectures: [], collapsed: true });
      console.log(this.course.curriculum);
    }
  }

  toggleCollapse(section: any) {
    section.collapsed = !section.collapsed;
  }



  publishCourse() {
    // Logic to publish the course
    console.log('Publishing course:', this.course);
  }

  editSection(section: any) {
    const newName = prompt("Enter new section name:", section.name);
    if (newName) {
      section.name = newName;
    }
  }

  deleteSection(section: any) {
    const confirmDelete = confirm("Are you sure you want to delete this section?");
    if (confirmDelete) {
      const index = this.course.curriculum.indexOf(section);
      if (index !== -1) {
        this.course.curriculum.splice(index, 1);
      }
    }
  }


   openAddLectureModal(section: any) {
  // Set the current section for which lecture is being added
  this.currentSection = section;
  // Open the modal
  this.addLectureModal.nativeElement.classList.add('show');
  this.addLectureModal.nativeElement.style.display = 'block';
  document.body.classList.add('modal-open');
}

closeAddLectureModal() {
  // Close the modal
  this.addLectureModal.nativeElement.classList.remove('show');
  this.addLectureModal.nativeElement.style.display = 'none';
  document.body.classList.remove('modal-open');
}

  editLecture(lecture: any) {
  const newTitle = prompt("Enter new lecture title:", lecture.title);
  if (newTitle !== null && newTitle !== undefined) {
    // Find the index of the lecture in the current section
    const index = this.currentSection.lectures.indexOf(lecture);
    if (index !== -1) {
      // Update the title of the lecture in the model
      this.currentSection.lectures[index].title = newTitle.trim();
    }
  }
}

  deleteLecture(section: any, lecture: any) {
    const confirmDelete = confirm("Are you sure you want to delete this lecture?");
    if (confirmDelete) {
      const index = section.lectures.indexOf(lecture);
      if (index !== -1) {
        section.lectures.splice(index, 1);
      }
    }
  }

  saveLecture(section: any) {
  // Add validation if necessary
  const lectureTitle = this.newLecture.title.trim();
  if (lectureTitle) {
    if (!this.currentSection.lectures) {
      this.currentSection.lectures = [];
    }
    this.currentSection.lectures.push({ title: lectureTitle, media: this.newLecture.media });
    this.closeAddLectureModal();
  } else {
    alert('Please enter a lecture title.');
  }

}
}



