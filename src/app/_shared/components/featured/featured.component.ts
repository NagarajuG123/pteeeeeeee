import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

const FEATURE_KEY = makeStateKey<any>('featureState');

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() apiUrl!: string;
  @Input() slug: string;

  isBrowser: boolean;
  featured: Details[] = [];
  news: Details[] = [];
  brandNews: Details[] = [];
  trendingNews: Details[] = [];
  url: string;
  openVideoPlayer = false;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
    public commonService: CommonService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    animateOut: 'slideOutDown',
    animateIn: 'slideInDown',
    navText: [
      '<img src="assets/img/slider-left-arrow.png" width="7px" height="15px" alt="slider arrow"/>',
      '<img src="assets/img/slider-right-arrow.png" width="7px" height="15px" alt="slider arrow"/>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    const featureApi = this.apiService.getAPI(
      `${this.apiUrl}?limit=4&offset=0`
    );
    const newsApi = this.apiService.getAPI(
      `${this.slug}/news?limit=4&offset=0`
    );
    const brandNews = this.apiService.getAPI(
      `1851/news?limit=4&offset=0&isBrand=true`
    );
    const trendingNews = this.apiService.getAPI(
      `1851/trending?limit=10&offset=0`
    );
    forkJoin([featureApi, newsApi, brandNews, trendingNews])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.featured = results[0].data;
        this.news = results[1].data;
        this.brandNews = results[2].data;
        this.trendingNews = results[3].data;
      });
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
}
