import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

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
  url: string;
  openVideoPlayer = false;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
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

    forkJoin([featureApi, newsApi, brandNews])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.featured = results[0].data;
        this.news = results[1].data;
        this.brandNews = results[2].data;
      });
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
}
