import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() apiUrl!: string;
  @Input() slug: string;

  featured: Details[] = [];
  news: Details[] = [];
  brandInfoNews: Details[] = [];
  isLoaded: boolean = false;
  s3Url = environment.s3Url;
  length: number;
  title: string;
  isBrowser: boolean;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor( private apiService: ApiService,
    public commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object) {
      this.isBrowser = isPlatformBrowser(platformId);
     }

  ngOnInit(): void {
    const featureApi = this.apiService.getAPI(`${this.apiUrl}`);
    const newsApi = this.apiService.getAPI(
      `${this.slug}/spotlight/industry?limit=3&offset=0`
    );
    const brandInfoApi = this.apiService.getAPI(`info?slug=${this.slug}`);

    forkJoin([featureApi, newsApi, brandInfoApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.featured = results[0].data;
        this.length = this.featured.length;
        this.news = results[1].data;
        this.brandInfoNews = results[2];
        this.isLoaded = true;
        this.commonService.isPageLoaded.next(true);
      });
      this.title = this.length < 8 ? 'Special Feature' : 'Featured Article';
  }
  isAwards() {
    return this.slug === 'franchisedevelopmentawards' ? true : false;
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

