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
  publication: any = [];

  data: any = [];
  showVideo: Boolean = false;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    const aboutus = this.apiService.getAPI(`1851/about-us`);
    const meta = this.apiService.getAPI(`1851/meta`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    forkJoin([publication, aboutus, meta]).subscribe((results) => {
      this.data = results[1].data;
      this.publication = results[0];
      if (this.data?.contents?.length > 1) {
        for (let i = 1; i < this.data.contents.length; i++) {
          this.publication_contents.push(this.data.contents[i]);
        }
      }
      this.metaService.setSeo(results[2].data);
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
