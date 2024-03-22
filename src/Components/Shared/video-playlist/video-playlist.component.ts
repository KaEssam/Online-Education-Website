import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-playlist',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './video-playlist.component.html',
  styleUrl: './video-playlist.component.css'
})
export class VideoPlaylistComponent {
  videoUrls: string[] = [
    "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&amp;profile_id=119",
    "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119",
    "https://player.vimeo.com/external/207590786.hd.mp4?s=bcd80c5d2f6bf1bbad3b1a670ef93861e72f9683&amp;profile_id=119",
    "https://player.vimeo.com/external/207590615.hd.mp4?s=c4bce1872859889c86b688c26c60ed2b5734de28&amp;profile_id=119",
    "http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test5_voice_mp4_480x360.mp4",
    "http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test7_voiceclip_mp4_480x360.mp4",
    "http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test8_voiceclip_mp4_480x320.mp4",
    "http://download.wavetlan.com/SVV/Media/HTTP/MP4/ConvertedFiles/Media-Convert/Unsupported/dw11222.mp4"
  ];
  safeUrls: SafeResourceUrl[] = [];
  currentVideoIndex = 0;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.safeUrls = this.videoUrls.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  playNextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoUrls.length;
  }
}
