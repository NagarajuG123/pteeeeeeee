import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  @Output() imageLoaded = new EventEmitter();
  publication_contents: any = [];
  loadedImageNum = 0;

  bannerImageLoaded: Boolean = false;
  mainimageLoaded: Boolean = false;

  data: any = [];
  showVideo: Boolean = false;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    const aboutus = this.apiService.getAPI(`1851/about-us`);
    const meta = this.apiService.getAPI(`1851/meta`);
    forkJoin([aboutus,meta]).subscribe(results => {
      this.data =  results[0].data;
      if (this.data?.contents?.length > 0) {
        for (let i = 1; i < this.data.contents.length; i++) {
          this.publication_contents.push(this.data.contents[i]);
        }
      }
      this.metaService.setSeo( results[1].data);
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
