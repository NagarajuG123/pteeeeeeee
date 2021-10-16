import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import 'lazysizes';
import * as $ from 'jquery';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import { isPlatformBrowser } from '@angular/common';

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
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  config: SwiperOptions = {
    spaceBetween: 5,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: false,
    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },
  };
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
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
}
