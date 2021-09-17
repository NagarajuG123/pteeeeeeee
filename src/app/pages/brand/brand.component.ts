import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  slug: any;
  type: string = '';
  mostRecent: any = [];
  categoryTrending: any = [];
  categoryParam = '';
  company: string = '';
  scrollOffset: number = 0;
  apiUrl: string = '';
  hasMore: boolean = false;
  categorySlug: any = '';
  mostRecentUrl: any;
  dynamicUrl: any;
  dynamicFirst: any = [];
  dynamicSecond: any = [];
  topBlock: any = [];
  hideTrending: boolean = false;
  hideNews: boolean = false;
  isBrowser!: boolean;
  data: Details[] = [];
  items: Details[] = [];
  tabName: any;
  defaultTab!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  specialFeatureUrl: string;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private metaService: MetaService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    items:  this.data.length > 2 ? 3 : this.data.length > 1 ? 2 : 1,
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
        items: 3,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.apiService
        .getAPI(`get-brand-by-slug/${this.slug}`)
        .subscribe(async (response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.type = response.type;
            this.company = response.name;
            if (this.type === 'category_page') {
              this.apiUrl = `1851/${this.slug}/featured`;
              const mostRecentUrl = this.apiService.getAPI(
                `1851/${this.slug}/most-recent`
              );
              const metaUrl = this.apiService.getAPI(`1851/${this.slug}/meta`);
              const trendingUrl = this.apiService.getAPI(
                `1851/${this.slug}/trending?limit=10&offset=0`
              );
              this.setParam(this.slug);
              forkJoin([mostRecentUrl, metaUrl, trendingUrl]).subscribe(
                (results) => {
                  this.mostRecent = results[0].data;
                  this.hasMore = results[0].has_more;
                  this.metaService.setSeo(results[1].data);
                  this.categoryTrending = results[2].data;
                }
              );
            } else if (this.type === 'brand_page') {
              this.apiUrl = `${this.slug}/featured-articles`;
              this.specialFeatureUrl = `${this.slug}/brand-latest-stories`;
              this.getMeta();
              this.getMostPopular();
              this.getSpotlight();
              if (this.slug !== '1851' && response['ga']) {
                this.googleAnalyticsService.appendGaTrackingCode(
                  response['ga']['1851_franchise'],
                  response['ga']['tracking_code'],
                  response['ga']['gtm_code'],
                  response.slug
                );
              }
            } else if (this.type === 'dynamic_page') {
              this.dynamicUrl = `${this.slug}`;
              this.getDynamic();
            }
          }
        });
    });
  }
  getMostPopular() {
    this.apiService
      .getAPI(`${this.slug}/trending?limit=9&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (response.data.length) {
          this.data  = response.data;
        }
      });
  }
  getSpotlight(){
    const spotlightCategoriesApi = this.apiService.getAPI(`1851/spotlights/categories`);
    const publicationApi = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([spotlightCategoriesApi, publicationApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.tabName = results[0].categories;
        this.defaultTab = results[0].defaultTab;

        this.apiService.getAPI(`${this.slug}/spotlight/${this.defaultTab}?limit=5&offset=0`)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((result) => {
            const data: any[] = [];
            result['data'].forEach((item: any) => {
              data.push(item);
            });
            this.items = data;
          });
      });
  }
  setActiveTab(val: any, item: any) {
    this.activeTab = val;
    this.tab = item?.shortName;
    this.getData(this.tab);
  }
  prev() {
    if (this.skipTab > 0) {
      this.skipTab -= 1;
    } else this.skipTab = 0;
  }
  next() {
    if (this.skipTab < this.tabName.length - this.commonService.vtabsItem) {
      this.skipTab += 1;
    }
  }
  getData(tabName: any) {
    const apiUrl = `1851/spotlight/${tabName.toLowerCase()}`;
    this.apiService
      .getAPI(`${apiUrl}?limit=10&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        const data: any[] = [];
        if (result.data.length) {
          result['data'].forEach((item: any, index: number) => {
            data.push(item);
          });
          this.items = data;
        }
      });
  }
  
  setParam(slug) {
    if (slug.includes('people')) {
      this.categoryParam = 'people';
    } else if (slug.includes('industry')) {
      this.categoryParam = 'industry';
    } else if (slug.includes('franchisee')) {
      this.categoryParam = 'franchisee';
    } else if (slug.includes('franchisor')) {
      this.categoryParam = 'franchisor';
    } else if (slug.includes('destinations')) {
      this.categoryParam = 'destinations';
    } else if (slug.includes('products')) {
      this.categoryParam = 'products';
    } else if (slug.includes('celebrities')) {
      this.categoryParam = 'celebrities';
    } else if (slug.includes('homes-to-own')) {
      this.categoryParam = 'homes-to-own';
    } else if (slug.includes('home-envy')) {
      this.categoryParam = 'home-envy';
    } else if (slug.includes('home-buzz')) {
      this.categoryParam = 'home-buzz';
    } else {
      this.categoryParam = 'columns';
    }
  }

  getDynamic() {
    this.apiService
      .getAPI(`page/${this.dynamicUrl}?limit=20&offset=${this.scrollOffset}`)
      .subscribe((response) => {
        this.topBlock = response.data;
        this.dynamicFirst = response.data.stories.slice(0, 10);
        this.dynamicSecond = response.data.stories.slice(10, 20);
        this.hasMore = response.has_more;
        this.metaService.setSeo(this.dynamicFirst[0].meta);
        this.apiService
          .getAPI(`1851/publication-instance`)
          .subscribe((result) => {
            const Title =
              this.dynamicUrl.charAt(0).toUpperCase() +
              this.dynamicUrl.slice(1);
            this.metaService.setTitle(`${Title} | ${result.title}`);
          });
      });
  }

  getMoreDynamic() {
    this.apiService
      .getAPI(
        `page/${this.dynamicUrl}?limit=10&offset=${
          this.dynamicSecond.length + 10
        }`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.stories.forEach((element: any) => {
          this.dynamicSecond.push(element);
        });
      });
  }

  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  getMoreData() {
    this.apiService
      .getAPI(
        `1851/${this.slug}/most-recent?limit=10&offset=${
          this.mostRecent.length + 1
        }`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.forEach((element: any) => {
          this.mostRecent.push(element);
        });
      });
  }
  getMeta() {
    this.apiService.getAPI(`${this.slug}/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((result) => {
          this.metaService.setTitle(
            `${response.data.seo.title} | ${result.title}`
          );
        });
    });
  }
}
