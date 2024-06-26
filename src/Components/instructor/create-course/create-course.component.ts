import { UploadImgService } from './../../../Services/upload-img.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCourseService } from '../../../Services/create-course.service';
import { GetCategoryService } from '../../../Services/get-category.service';
import Swal from 'sweetalert2';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  providers: [CreateCourseService, UploadImgService, GetCategoryService],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent implements OnInit {
  currentStep: number = 1;
  course: any = {
    title: '',
    categoryID: 0,
    description: '',
    img: File,
    price: 0,
    sections: [],
    status: 'draft',
  };
  contents: any = {
    title: '',
    url: '', // You may need to adjust this depending on how you handle media uploads
  };

  img: any = {
    img: File,
    title: '',
  };

  section: any = {
    title: '',
  };

  categories: any[] = [];

  @ViewChild('addcontentModal') addcontentModal!: ElementRef;
  currentSection: any;

  FormInfo = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    img: new FormControl(''),
  });

  get isTitleInfoValid() {
    return (
      this.FormInfo.get('title')?.valid || this.FormInfo.get('title')?.untouched
    );
  }

  get isDescriptionValid() {
    return (
      this.FormInfo.get('description')?.valid ||
      this.FormInfo.get('description')?.untouched
    );
  }

  FormCurriculum = new FormGroup({
    sectionTitle: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
  });

  get isSectionValid() {
    return (
      this.FormCurriculum.get('sectionTitle')?.valid ||
      this.FormCurriculum.get('sectionTitle')?.untouched
    );
  }

  FormSettings = new FormGroup({
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]+$'),
    ]),
  });

  get isPriceValid() {
    return (
      this.FormSettings.get('price')?.valid ||
      this.FormSettings.get('price')?.untouched
    );
  }

  FormContant = new FormGroup({
    contentTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    media: new FormControl('', [
      Validators.required,
      Validators.pattern(this.pattern()),
    ]),
  });

  pattern() {
    const pattern: RegExp = new RegExp(
      `(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))`
    );
    return pattern;
  }

  get isContentTitleValid() {
    return (
      this.FormContant.get('contantTitle')?.valid ||
      this.FormContant.get('contantTitle')?.untouched
    );
  }

  get isMediaValid() {
    return (
      this.FormContant.get('media')?.valid ||
      this.FormContant.get('media')?.untouched
    );
  }

  isContentEdit: boolean = false;

  isSectionEdit: boolean = false;

  lastUpdateSection: any;
  lastUpdateContent: any;

  onCategorySelected(event: any) {
    this.course.categoryID = event.target.value;
    console.log('Selected category:', this.course.categoryID);
  }

  constructor(
    private CreateCourseService: CreateCourseService,
    private UploadImgService: UploadImgService,
    private getCategoriesService: GetCategoryService
  ) {}

  ngOnInit(): void {
    this.getCategoriesService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
      console.log('Categories:', response);
    });
  }

  isInfoFormValid() {
    if (this.FormInfo.valid) {
      this.nextStep();
    } else {
      this.FormInfo.markAllAsTouched();
    }
  }

  isCurriculumFormValid() {
    if (this.FormCurriculum.valid) {
      this.nextStep();
    } else {
      this.FormCurriculum.markAllAsTouched();
    }
  }

  isSettingsFormValid() {
    if (this.FormSettings.valid) {
      this.publishCourse();
    } else {
      this.FormSettings.markAllAsTouched();
    }
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  goBack() {
    console.log('Navigating back to courses page');
  }

  toggleCollapse(section: any) {
    section.collapsed = !section.collapsed;
  }

  // Section functions
  addSection() {
    if (this.FormCurriculum.valid) {
      // Check form validity
      const sectionTitle = this.FormCurriculum.get('sectionTitle')?.value;
      this.course.sections.push({ title: sectionTitle, contents: [] });
      this.FormCurriculum.reset(); // Reset the form
    }
  }

  editSection(section: any) {
    // Populate your form fields with this.section data
    this.isSectionEdit = true;
    this.section = section;
    // Open edit modal
  }

  editSectionData(section: any) {
    console.log(section);
    const sectionTitle = this.FormCurriculum.get('sectionTitle')?.value;
    const index = this.course.sections.indexOf(section);
    if (index !== -1) {
      this.course.sections[index].title = sectionTitle;
    }
    this.isSectionEdit = false;
    this.section = '';
  }

  deleteSection(section: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will remove the section from the current view.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.course.sections.indexOf(section);
        if (index !== -1) {
          this.course.sections.splice(index, 1);

          Swal.fire(
            'Deleted!',
            'Your section has been removed (temporarily).',
            'success'
          );
        }
      }
    });
  }

  saveSection() {
    const sectionTitle = this.section.title;
    if (sectionTitle) {
      this.course.sections.push({ title: sectionTitle, contents: [] });
      console.log(this.course.sections);
    }
  }

  // Content functions
  Addcontent(section: any) {
    // Set the current section for which content is being added
    this.currentSection = section;
    // Open the modal
    this.addcontentModal.nativeElement.classList.add('show');
    this.addcontentModal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    this.FormContant.reset();
  }

  closeAddcontentModal() {
    // Close the modal
    this.addcontentModal.nativeElement.classList.remove('show');
    this.addcontentModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  editcontant(content: any, i: number) {
    const index = this.course.sections[i].contents.indexOf(content);
    // if (index !== undefined) {
    //   index.title = this.contents.title;
    //   index.media = this.contents.media;
    // }
    // content.setItem('content', JSON.stringify(content));

    this.isContentEdit = true;
    const UpdateContent = this.course.sections[i].contents[index];
    this.lastUpdateSection = i;
    this.lastUpdateContent = index;
    contentTitle: this.FormContant.get('contentTitle')?.setValue(
      UpdateContent.title
    );
    mediaUpload: this.FormContant.get('media')?.setValue(UpdateContent.url);

    // Open edit modal
    this.addcontentModal.nativeElement.classList.add('show');
    this.addcontentModal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  editContentData(content: any) {
    console.log(content);
    console.log(this.course);
    console.log(this.lastUpdateSection);
    console.log(this.lastUpdateContent);
    const UpdateContent =
      this.course.sections[this.lastUpdateSection].contents[
        this.lastUpdateContent
      ];
    console.log(UpdateContent);
    UpdateContent.title = content.title;
    UpdateContent.url = content.url;
    this.isContentEdit = false;
    this.closeAddcontentModal();
  }

  deleteContent(content: any, i: number) {
    console.log(this.contents);
    console.log(this.course.sections);

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will remove the content from the current view.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(content);
        const index = this.course.sections[i].contents.indexOf(content);
        console.log(index);
        if (index > -1) {
          this.course.sections[i].contents.splice(index, 1);
          Swal.fire(
            'Deleted!',
            'Your content has been removed (temporarily).',
            'success'
          );
        }
      }
    });
  }

  savecontent(section: any) {
    const contentTitle = this.FormContant.get('contentTitle')?.value;
    console.log(this.FormContant.get('contentTitle'));
    if (contentTitle) {
      if (!this.currentSection.contents) {
        this.currentSection.contents = [];
      }
      this.currentSection.contents.push({
        title: contentTitle,
        url: this.contents.url,
      });
      this.closeAddcontentModal();
    } else {
      this.FormContant.markAllAsTouched();
    }
  }

  publishCourse() {
    this.CreateCourseService.createCourse(this.course).subscribe((response) => {
      console.log('Course published:', response);
    });
    console.log('Publishing course:', this.course);
  }

  onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe((base64) => {
      this.course.img = base64;
      console.log(this.course.img);
    });

    // const file: File = event.target.files[0];

    // if (file) {
    //   // const formData = new FormData();
    //   // formData.append("image", file);
    //   // formData.append("id", '5');

    //   // const upload$ = this.UploadImgService.uploadImg(formData);

    //   // upload$.subscribe();

    //   this.course.img = file;
    // }
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) =>
      result.next(btoa(event.target.result.toString()));
    return result;
  }
}
