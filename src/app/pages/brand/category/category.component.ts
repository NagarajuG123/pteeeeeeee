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
import 'lazysizes';
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
  topData: any[] = [];
  mostRecent: Details[] = [];
  tabName: any;
  defaultTab!: string;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  mainText: string;
  description: string;
  banner: string;
  isLoaded: boolean;
  s3Url = environment.s3Url;
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
      this.mainText = this.slug.replace('-', ' ');
      this.tab = this.slug.replace('-spotlight', '');
      const featureApi = this.apiService.getAPI(
        `${this.type}/${this.slug}/featured?limit=24&offset=0`
      );
      const metaApi = this.apiService.getAPI(`1851/${this.slug}/meta`);
      const spotlightCategoriesApi = this.apiService.getAPI(
        `${this.type}/spotlights/categories`
      );
      forkJoin([featureApi, metaApi, spotlightCategoriesApi])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          if (results[0].data.length) {
            this.topData = results[0].data.slice(0,4);
            this.featuredData = results[0].data.slice(4,24);
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
          } else {
            this.router.navigateByUrl(`/${this.type}`);
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
      .getAPI(`${this.type}/${tabName}/featured?limit=24&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        const data: any[] = [];
        if (result.data.length ) {
          result['data'].forEach((item: any, index: number) => {
            data.push(item);
          });
          this.topData = data.slice(0,4);
          this.featuredData = data.slice(4,24);
        }
      });
  }
  getMore(tabName: any) {
    this.apiService
      .getAPI(
        `${this.type}/${tabName}/featured?limit=5&offset=${
          this.featuredData.length + 4
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
