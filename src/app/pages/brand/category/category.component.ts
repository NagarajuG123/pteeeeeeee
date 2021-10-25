import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import 'lazysizes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() slug!: string;

  isBrowser: boolean;
  featuredData: any[] = [];
  mostRecent: Details[] = [];
  tabName: any;
  defaultTab!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  mainText: string;
  description: string;
  banner: string;
  isLoaded: boolean;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    private state: TransferState,
    public commonService: CommonService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe((param) => {
      this.slug = param.slug;
      this.mainText = this.slug.replace('-', ' ');
      const featureApi = this.apiService.getAPI(
        `1851/${this.slug}/featured?limit=25&offset=0`
      );
      const metaApi = this.apiService.getAPI(`1851/${this.slug}/meta`);
      const spotlightCategoriesApi = this.apiService.getAPI(
        `1851/spotlights/categories`
      );
      forkJoin([featureApi, metaApi, spotlightCategoriesApi])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          this.featuredData = results[0].data;
          this.metaService.setSeo(results[1].data);
          this.tabName = results[2].categories;
          this.activeTab =
            this.tabName
              .map(function (e) {
                return e.slug;
              })
              .indexOf(this.slug) + 1;
          this.description = this.tabName.find(
            (x) => x.slug == this.slug
          ).description;
          this.banner = this.tabName.find((x) => x.slug == this.slug).image;
          this.isLoaded = true;
        });
    });
  }

  prev() {
    if (this.skipTab > 0) {
      this.skipTab -= 1;
      this.activeTab -= 1;
      this.setActiveTab(this.activeTab, this.tabName[this.activeTab]);
    } else this.skipTab = 0;
  }
  next() {
    if (this.skipTab < this.tabName.length - this.commonService.vtabsItem) {
      this.skipTab += 1;
      this.activeTab += 1;
      this.setActiveTab(this.activeTab, this.tabName[this.activeTab]);
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
      .getAPI(`1851/${tabName}/featured?limit=24&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        const data: any[] = [];
        if (result.data.length) {
          result['data'].forEach((item: any, index: number) => {
            data.push(item);
          });
          this.featuredData = data;
        }
      });
  }
  getMore(tabName: any) {
    this.apiService
      .getAPI(
        `1851/${tabName}/featured?limit=5&offset=${
          this.featuredData.length + 1
        }`
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result.data.length) {
          result['data'].forEach((item: any, index: number) => {
            this.featuredData.push(item);
          });
        }
      });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.commonService.resizeSidebar(event.target.innerWidth);
  }
}
