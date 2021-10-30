import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import 'lazysizes';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  public innerWidth: any;
  products: any;
  products2: any;
  products3: any;
  options1: any;
  options2: any;
  options3: any;
  videoData: Details[] = [];
  videoUrl: string;
  url: string;
  openVideoPlayer = false;
  isBrowser: boolean = false;
  isLoaded: boolean = false;
  customOptions: OwlOptions = {};
  s3Url = environment.s3Url;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setOption();
    this.apiService
      .getAPI(`1851/videos?site=1851`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.videoData = result.data;
        this.videoUrl = result.data?.media?.url;
        this.isLoaded = true;
      });
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $('.modal').on('hidden.bs.modal', function () {
        $('.modal').hide();
        $('.modal iframe').attr('src', $('.modal iframe').attr('src'));
      });
      let items = document.querySelectorAll('.carousel .carousel-item');

      items.forEach((el) => {
        const minPerSlide = 4;
        let next = el.nextElementSibling;
        for (var i = 1; i < minPerSlide; i++) {
          if (!next) {
            // wrap carousel by using first child
            next = items[0];
          }
          // let cloneChild = next.cloneNode(true);
          // el.appendChild(cloneChild.children[0]);
          // next = next.nextElementSibling;
        }
      });
    }
  }
  setOption() {
    this.customOptions = {
      autoplay: false,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: [
        `<img src="${environment.s3Url}slider-left-arrow.png" alt="slider arrow" width="19" height="30"/>`,
        `<img src="${environment.s3Url}slider-right-arrow.png" alt="slider arrow" width="19" height="30"/>`,
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 5,
        },
      },
      nav: true,
    };
  }
}
