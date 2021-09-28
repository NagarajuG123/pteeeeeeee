import {
  Component,
  OnInit,
  Input,
  PLATFORM_ID,
  Inject,
  HostListener,
} from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
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
  descriptionLimit = 100;
  descriptionLimitOptions = [
    { width: 1200, limit: 100 },
    { width: 992, limit: 50 },
  ];
  brandNewsTitleLimit = 85;
  brandNewsTitleLimitOptions = [
    { width: 1320, limit: 85 },
    { width: 992, limit: 30 },
  ];

  NewsTitleLimit = 45;
  NewsTitleLimitOptions = [
    { width: 1200, limit: 45 },
    { width: 992, limit: 25 },
  ];

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
    this.setLimit('');
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

  setLimitValues(Options, fieldName) {
    let limitVal = 0;
    Options.forEach((item) => {
      if (window.innerWidth < item.width) {
        limitVal = item.limit;
      }
    });
    if (Number(limitVal) === 0) {
      limitVal = Number(Options[0].limit);
    }

    switch (fieldName) {
      case 'descriptionLimit':
        this.descriptionLimit = Number(limitVal);
        break;
      case 'brandNewsTitleLimit':
        this.brandNewsTitleLimit = Number(limitVal);
        break;
      case 'NewsTitleLimit':
        this.NewsTitleLimit = Number(limitVal);
        break;
      default:
        break;
    }
  }

  async setLimit(event: any) {
    await this.setLimitValues(this.descriptionLimitOptions, 'descriptionLimit');
    await this.setLimitValues(
      this.brandNewsTitleLimitOptions,
      'brandNewsTitleLimit'
    );
    await this.setLimitValues(this.NewsTitleLimitOptions, 'NewsTitleLimit');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setLimit(event);
  }
}
