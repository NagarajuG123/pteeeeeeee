import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import 'lazysizes';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
      var sliderContentWrapper = document.querySelector('.swiper-wrapper');
      var wrapper = document.createElement('div');
      wrapper.classList.add('swiper-content--wrapper');
      if (sliderContentWrapper) {
        sliderContentWrapper.parentNode.insertBefore(
          wrapper,
          sliderContentWrapper
        );
        wrapper.appendChild(sliderContentWrapper);
      }
    }
  }
  setOption(){
    this.customOptions = {
      autoplay: false,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: [
        '<img src="assets/img/slider-left-arrow.png" alt="slider arrow" />',
        '<img src="assets/img/slider-right-arrow.png" alt="slider arrow" />',
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
