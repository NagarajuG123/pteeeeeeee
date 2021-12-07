import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  data: Details[] = [];
  openVideoPlayer: boolean;
  url: string;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  customOptions: OwlOptions = {};
  isLoaded: boolean = false;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setConfig();
    const videoData = this.apiService
      .getAPI(`1851/videos?site=1851`)
      .subscribe((result) => {
        this.data = result.data;
        this.isLoaded = true;
      });
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  setConfig() {
    this.customOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      nav: true,

      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 4,
        },
        940: {
          items: 5,
        },
      },
    };
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $('.modal').on('hidden.bs.modal', function () {
        $('.modal').hide();
        $('.modal iframe').attr('src', $('.modal iframe').attr('src'));
      });
    }
  }
}
