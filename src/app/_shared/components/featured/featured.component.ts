import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
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

  isBrowser: boolean;
  featured: Details[] = [];
  news: Details[] = [];
  trending: Details[] = [];
  slug: string = '';
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
    this.slug = '1851';
    this.getFeatured();
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
      const trending = this.apiService.getAPI(
        `${this.slug}/trending?limit=9&offset=0`
      );
      const featured: any = {};
      forkJoin([featureApi, newsApi, trending])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          featured['data'] = results[0].data;
          featured['news'] = results[1].data;
          featured['trending'] = results[2].data;
          this.state.set(FEATURE_KEY, featured as any);
        });
    } else {
      this.featured = featured['data'];
      this.news = featured['news'];
      this.trending = featured['trending'];
    }
  }
}
