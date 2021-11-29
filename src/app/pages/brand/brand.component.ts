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
import 'lazysizes';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  slug: any;
  type: string = '';
  company: string = '';
  scrollOffset: number = 0;
  apiUrl: string = '';
  hasMore: boolean = false;
  dynamicUrl: any;
  dynamicStories: any = [];
  topBlock: any = [];
  data: Details[] = [];
  items: Details[] = [];
  tabName: any;
  defaultTab!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  length: number;
  isCategory: boolean;
  isBrand: boolean;
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

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    lazyLoad: true,

    navText: ['', ''],
    items: this.data.length > 2 ? 3 : this.data.length > 1 ? 2 : 1,
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
    this.isBrand = false;

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
            this.isCategory = true;
            if (this.type === 'brand_page') {
              this.isCategory = false;
              this.isBrand = true;
              this.apiUrl = `${this.slug}/featured-articles`;
              this.apiService
                .getAPI(`${this.apiUrl}`)
                .pipe(takeUntil(this.onDestroy$))
                .subscribe((response) => {
                  if (response.data.length) {
                    this.length = response.data.length;
                  }
                });
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
              this.isCategory = false;
              this.isBrand = false;
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
          this.data = response.data;
        }
      });
  }
  getSpotlight() {
    const spotlightCategoriesApi = this.apiService.getAPI(
      `1851/spotlights/categories`
    );
    const publicationApi = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([spotlightCategoriesApi, publicationApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.tabName = results[0].categories;
        this.defaultTab = results[0].defaultTab;

        this.apiService
          .getAPI(`${this.slug}/spotlight/${this.defaultTab}?limit=4&offset=0`)
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

  getDynamic() {
    this.apiService
      .getAPI(`page/${this.dynamicUrl}?limit=12&offset=${this.scrollOffset}`)
      .subscribe((response) => {
        this.topBlock = response.data;
        this.dynamicStories = response.data.stories;
        this.hasMore = response.has_more;
        this.metaService.setSeo(this.dynamicStories[0].meta);
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
        `page/${this.dynamicUrl}?limit=4&offset=${this.dynamicStories.length}`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.stories.forEach((element: any) => {
          this.dynamicStories.push(element);
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
