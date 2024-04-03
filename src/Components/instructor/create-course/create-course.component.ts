// import { UploadImgService } from "./../../../Services/upload-img.service";
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCourseService } from "../../../Services/create-course.service";
import { GetCategoryService } from "../../../Services/get-category.service";


@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,],
  providers: [CreateCourseService, GetCategoryService],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
currentStep: number = 1;
  course: any = {
  title: '',
  categoryID:'',
  description: '',
  img: FormData,
  url: '',
  price: 0,
  sections: [],
  status: 'draft'
  };
  contents: any = {
    title: '',
    url: '' // You may need to adjust this depending on how you handle media uploads
  };

  img: any ={
    img: FormData,
    title: ''
  };

  categories: any[] = [];
  

@ViewChild('addLectureModal') addLectureModal!: ElementRef;
  currentSection: any;

  constructor(private CreateCourseService: CreateCourseService, private getCategoriesService: GetCategoryService) {}
  // constructor(private CreateCourseService: CreateCourseService, private UploadImgService: UploadImgService, private getCategoriesService: GetCategoryService) {}


 
  ngOnInit(): void {
    this.getCategoriesService.getAllCategories().subscribe((response:any) => {
      this.categories = response;
      console.log('Categories:', response);
    });
  }

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
      this.course.sections.push({ title: sectionName, contents: [] });
      console.log(this.course.sections);
    }
  }

  toggleCollapse(section: any) {
    section.collapsed = !section.collapsed;
  }



  publishCourse() {
    this.CreateCourseService.createCourse(this.course).subscribe((response) => {
      console.log('Course published:', response);
    });
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
      const index = this.course.sections.indexOf(section);
      if (index !== -1) {
        this.course.sections.splice(index, 1);
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
  const lectureTitle = this.contents.title.trim();
  if (lectureTitle) {
    if (!this.currentSection.lectures) {
      this.currentSection.lectures = [];
    }
    this.currentSection.lectures.push({ title: lectureTitle, media: this.contents.media });
    this.closeAddLectureModal();
  } else {
    alert('Please enter a lecture title.');
  }

}


// OnFileSelected(event:any){
//   const file:File = event.target.files[0];

//   if (file) {
//       const formData = new FormData();
//       formData.append("img", file);

//       const upload$ = this.UploadImgService.uploadImg(formData, 5);

//       upload$.subscribe();
// }
// }
}



