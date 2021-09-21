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
  descriptionLimit = 90;
  descriptionLimitOptions = [
    { width: 1200, limit: 85 },
    { width: 992, limit: 30 },
  ];
  brandNewsTitleLimit = 70;
  brandNewsTitleLimitOptions = [
    { width: 1320, limit: 60 },
    { width: 992, limit: 20 },
  ];

  NewsTitleLimit = 35;
  NewsTitleLimitOptions = [
    { width: 1200, limit: 35 },
    { width: 992, limit: 20 },
  ];

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
    this.getFeatured();
    this.setLimit('');
  }

  getFeatured() {
    const featured = this.state.get(FEATURE_KEY, null as any);
    if (!featured) {
      const featureApi = this.apiService.getAPI(
        `${this.apiUrl}?limit=4&offset=0`
      );
      const newsApi = this.apiService.getAPI(
        `${this.slug}/news?limit=4&offset=0`
      );
      const brandNews = this.apiService.getAPI(
        `1851/news?limit=4&offset=0&isBrand=true`
      );
      const featured: any = {};
      forkJoin([featureApi, newsApi, brandNews])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          featured['data'] = results[0].data;
          featured['news'] = results[1].data;
          featured['brandNews'] = results[2].data;

          this.state.set(FEATURE_KEY, featured as any);
        });
    } else {
      this.featured = featured['data'];
      this.news = featured['news'];
      this.brandNews = featured['brandNews'];
    }
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
    // console.log(
    //   'ss',
    //   this.descriptionLimit,
    //   this.brandNewsTitleLimit,
    //   this.NewsTitleLimit
    // );
  }

  async setLimit(event: any) {
    console.log('ss');
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
