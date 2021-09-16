import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';

const RESULT_KEY = makeStateKey<any>('mostPopularBrandState');

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {
  @Input() slug;
  isBrowser!: boolean;
  data: Details[] = [];
  items: Details[] = [];
  tabName: any;
  defaultTab!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  apiUrl: string;
  brandSlug: string;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
    public commonService: CommonService
  ) { this.isBrowser = isPlatformBrowser(platformId); }

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
    this.apiUrl = `${this.slug}/featured-articles`;
    this.brandSlug = this.slug;
    this.getMostPopular();
    this.getSpotlight();
  }
  getMostPopular() {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const mostPopular = this.tstate.get(RESULT_KEY, {});
      this.data = mostPopular['data'];
      console.log(this.data);
    } else {
      const mostPopular: any = {};
      this.apiService
        .getAPI(`${this.slug}/trending?limit=9&offset=0`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          if (response.data.length) {
            mostPopular['data'] = response.data;
          }
        });
      this.tstate.set(RESULT_KEY, mostPopular);
    }
  }
  getSpotlight(){
    const spotlightCategoriesApi = this.apiService.getAPI(`1851/spotlights/categories`);
    const publicationApi = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([spotlightCategoriesApi, publicationApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.tabName = results[0].categories;
        this.defaultTab = results[0].defaultTab;

        this.apiService.getAPI(`1851/spotlight/${this.defaultTab}?limit=10&offset=0`)
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
}