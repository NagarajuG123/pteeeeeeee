import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  slug: any;
  name: any;
  type: string = '';
  scrollOffset: number = 0;
  featuredApiUrl: string = '';
  trendingApiUrl: string = '';
  hasMore: boolean = false;
  dynamicUrl: any;
  dynamicStories: any = [];
  topBlock: any = [];
  isCategory: boolean;
  isBrand: boolean;
  page= 1;
  s3Url = environment.s3Url;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private metaService: MetaService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.isBrand = false;

    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.apiService
        .getAPI2(`${this.slug}`)
        .subscribe(async (response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.type = response.type;
            this.name=response.name;
            this.isCategory = true;
            if (this.type === 'brand_page') {
              this.isCategory = false;
              this.isBrand = true;
              this.featuredApiUrl = `articles/featured?limit=6&page=1&slug=${this.slug}`;
              this.trendingApiUrl = `articles/trending?limit=9&page=1&slug=${this.slug}`;
              this.getMeta();
              if (this.slug !== '1851' && response['ga']) {
                this.googleAnalyticsService.appendGaTrackingCode(
                  response['ga']['1851_franchise'],
                  response['ga']['tracking_code'],
                  response['ga']['gtm_code'],
                  response.slug
                );
              }
            } else if (this.type === 'dynamic_page') {
              this.isCategory = false;
              this.isBrand = false;
              this.dynamicUrl = `${this.slug}`;
              this.getDynamic();
            }
          }
        });
    });
  }
 
  getDynamic() {
     this.apiService
      .getAPI2(`articles/awards?slug=${this.dynamicUrl}&limit=20&page=${this.page}`)
        .subscribe((result) => {
        this.topBlock = result;
        this.dynamicStories = result.data;
        this.hasMore = result.hasMore;
        this.metaService.setSeo(this.dynamicStories.meta);
            const Title =
              this.dynamicUrl.charAt(0).toUpperCase() +
              this.dynamicUrl.slice(1);
            this.metaService.setTitle(`${Title} | ${this.commonService.publication.title}`);
      });
  }

  getMoreDynamic() {
    this.apiService
      .getAPI2(
        `articles/awards?slug=${this.dynamicUrl}&limit=5&page=${this.page + 4}`
      )
      .subscribe((result) => {
        this.hasMore = result.hasMore;
        this.page++;
        result.data.forEach((element: any) => {
          this.dynamicStories.push(element);
        });
      });
  }

  getMeta() {
    this.apiService.getAPI2(`meta?slug=${this.slug}&is_brand=true`).subscribe((response) => {
      this.metaService.setSeo(response.data);
          this.metaService.setTitle(
            `${response.data.seo.title} | ${this.commonService.publication.title}`
          );
    });
  }
}
