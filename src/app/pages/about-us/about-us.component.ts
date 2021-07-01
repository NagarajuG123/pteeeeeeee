import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { aboutUsData } from 'src/app/_core/models/aboutus';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @Output() imageLoaded = new EventEmitter();
  publication_contents: aboutUsData[] = [];
  loadedImageNum = 0;

  bannerImageLoaded: Boolean = false;
  mainimageLoaded: Boolean = false;

  data: aboutUsData[] = [];
  showVideo: Boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAPI(`1851/about-us`).subscribe((response ) =>{
      this.data = response.data;
      if (this.data?.contents?.length > 0) {
        for (let i = 1; i < this.data.contents.length; i++) {
          this.publication_contents.push(this.data.contents[i]);
        }
      }
    }); 
  }

  onModalHide() {
    this.showVideo = false;
  }

  bannerImageLoad() {
    this.bannerImageLoaded = true;
  }
   mainImageLoad() {
    this.mainimageLoaded = true;
  }
}