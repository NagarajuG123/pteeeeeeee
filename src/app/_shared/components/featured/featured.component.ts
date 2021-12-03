import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() apiUrl!: string;
  @Input() slug: string;

  featured: Details[] = [];
  news: Details[] = [];
  brandNews: Details[] = [];
  brandInfoNews: Details[] = [];
  isLoaded: boolean = false;
  s3Url = environment.s3Url;
  length: number;
  title: string;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.title = "Feature Article";
    const featureApi = this.apiService.getAPI(
      `${this.apiUrl}`
    );
    const newsApi = this.apiService.getAPI(
      `${this.slug}/spotlight/industry?limit=3&offset=0`
    );
    const brandNews = this.apiService.getAPI(
      `${this.slug}/latest?limit=4&offset=0`
    );

    forkJoin([featureApi, newsApi, brandNews])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.featured = results[0].data;
        this.length = this.featured.length;
        this.news = results[1].data;
        this.brandNews = results[2].data;
        this.isLoaded = true;
        this.commonService.isPageLoaded.next(true);
      });

    if (this.slug !== '1851') {
      this.apiService
        .getAPI(`info?slug=${this.slug}`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          this.brandInfoNews = response;
        });
        this.title = this.length < 8 ? 'Special Feature' : 'Featured Article';
    }
  }

  isAwards() {
    return this.slug === 'franchisedevelopmentawards' ? true : false;
  }
}
