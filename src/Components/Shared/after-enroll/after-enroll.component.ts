import { Course } from './../../../Services/course';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import { VideoService } from '../../../Services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../Services/courses.service';

interface Section {
  title: string;
  contents: Video[];
}

interface Video {
  id: number;
  title: string;
  url: string;
}

@Component({
  selector: 'app-after-enroll',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [VideoService, CoursesService],
  templateUrl: './after-enroll.component.html',
  styleUrl: './after-enroll.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class AfterEnrollComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;
  id: any
  Course: any;
  selectedVideo: Video | undefined;
  activeSectionIndex: number = -1; // Track the currently active section index
  player: any;
  selectedSrc: any;

  isLoading = true; // Flag to indicate data loading state
  constructor(private elementRef: ElementRef, private videoService: VideoService, private Activated: ActivatedRoute, private courseService: CoursesService) {
    this.id = this.Activated.snapshot.params["id"];
  }

  ngOnInit() {
    this.courseService.getCourseById(this.id).subscribe(data => {
      this.Course = data;
      this.isLoading = false; // Data loaded, turn off loading indicator

      // Select the first video from the first section if available
      if (this.Course && this.Course.sectionsContent) {
        const firstSection = this.Course.sectionsContent[0];
        this.selectedVideo = firstSection.contents && firstSection.contents.length > 0 ? firstSection.contents[0].id: undefined;
        console.log(firstSection.contents[0]);
        this.selectedSrc = `http://skillgro.runasp.net/api/Video/GetVideoStream/${this.selectedVideo?.id}`
      } else {
        console.warn('Course data or sectionsContent missing from API response');
      }

      this.player = videojs(this.target.nativeElement, {sources: [{ src: this.selectedSrc, type: 'video/mp4' }]}, () => {
        console.log('Player ready');
      });
    });

  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onVideoClick(video: Video) {
    this.selectedVideo = video;
    console.log('Selected video URL:', video.url);

    // Pause current video (if any)
    if (this.player) {
      this.player.pause();
    }

    // Load new video and play
    this.selectedSrc = `http://skillgro.runasp.net/api/Video/GetVideoStream/${video.id}`
    // this.player.src(this.selectedSrc);
    this.player.load();
    this.player.play();
  }

  toggleSection(sectionIndex: number) {
    // Update active section index if different from current
    if (this.activeSectionIndex !== sectionIndex) {
      this.activeSectionIndex = sectionIndex;
    } else {
      // Clicking on the same section collapses it
      this.activeSectionIndex = -1;
    }
  }
}

