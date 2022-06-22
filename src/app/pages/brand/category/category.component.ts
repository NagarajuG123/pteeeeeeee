import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() slug!: string;
  @Input() type!: string;

  isBrowser: boolean;
  featuredData: any[] = [];
  mostRecent: Details[] = [];
  tabName: any;
  defaultTab!: string;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  mainText: string;
  description: string = '';
  banner: string;
  topSection :any;
  isLoaded: boolean;
  hasMore: boolean;
  s3Url = environment.s3Url;
  rows: any;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe((param) => {
      this.slug = param.slug;
    });
    this.route.paramMap.subscribe((params) => {
      if (this.type !== '1851') {
        this.slug = params.get('item');
      }
      this.tab = this.slug.replace('-spotlight', '');
      const featureApi = this.apiService.getAPI2(
        `articles/featured?categorySlug=${this.tab}&limit=20&page=1`
      );
      const metaApi = this.apiService.getAPI2(`meta?slug=${this.tab}`);
      const spotlightCategoriesApi = this.apiService.getAPI(
        `${this.type}/spotlights/categories`
      );
      const topSectionApi = this.apiService.getAPI2(`category/details`);
      forkJoin([featureApi, metaApi, spotlightCategoriesApi,topSectionApi])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
            this.tabName = results[2].categories;
            this.metaService.setSeo(results[1].data);
            this.rows = `row-cols-lg-${this.tabName.length}`;
            this.topSection =  results[3].data
            this.activeTab =
            this.topSection
              .map(function (e) {
                return e.slug;
              })
              .indexOf(this.tab) + 1;
            this.mainText = this.topSection.find((x) => x.slug == this.tab).title;
            if(this.topSection.find(
              (x) => x.slug == this.tab
            ) != undefined) {
              this.featuredData = results[0].data;
              this.hasMore = results[0].hasMore;
                this.description = this.topSection.find(
                  (x) => x.slug == this.tab
                ).description;
                this.banner = this.topSection.find((x) => x.slug == this.tab).media.url;
              this.isLoaded = true;
            }
        });
    });
  }

  prev() {
    if (this.skipTab > 0) {
      this.skipTab -= 1;
      this.activeTab -= 1;
      this.setActiveTab(this.activeTab, this.tabName[this.activeTab - 1]);
    } else this.skipTab = 0;
  }
  next() {
    if (this.skipTab < this.tabName.length - this.commonService.vtabsItem) {
      this.skipTab += 1;
      this.activeTab += 1;
      this.setActiveTab(this.activeTab, this.tabName[this.activeTab - 1]);
    }
  }
  prevMobile() {
    this.activeTab -= 1;
    if(this.activeTab > 0){
      this.setActiveTab(this.activeTab, this.tabName[this.activeTab - 1]);
    }
  }
  nextMobile() {
    this.activeTab += 1;
    if(this.activeTab <= this.tabName.length){
      this.setActiveTab(this.activeTab, this.tabName[this.activeTab - 1]);
    }
  }
  setActiveTab(val: any, item: any) {
    this.activeTab = val;
    this.tab = item?.shortName;
    this.mainText = item.name;
    this.description = item.description;
    this.banner = item.image;
    this.getData(item.slug);
  }
  getData(tabName: any) {
    this.apiService
      .getAPI2(`articles/featured?categorySlug=${tabName}&limit=20&page=1`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        const data: any[] = [];
        if (result.data.length ) {
          result['data'].forEach((item: any) => {
            data.push(item);
          });
          this.featuredData = data;
          this.hasMore = result.hasMore;
        }
      });
  }
  getMore() {
    this.apiService
      .getAPI2(
        `articles/featured?categorySlug=${this.tabName[this.activeTab-1].slug}&limit=5&page=${
          this.featuredData.length + 4
        }`
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result.data.length) {
          result['data'].forEach((item: any) => {
            this.featuredData.push(item);
          });
          this.hasMore = result.hasMore;
        }
      });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.commonService.resizeSidebar(event.target.innerWidth);
  }
}
