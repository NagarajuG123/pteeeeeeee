import { Component, HostListener, Input, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss'],
})
export class SpotlightComponent implements OnInit {
  @Input() slug: string;

  s3Url = environment.s3Url;
  items: Details[] = [];
  tabName: any;
  defaultTab!: string;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  isLoaded: boolean = false;
  rows: any;
  hasMore: boolean;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    public commonService: CommonService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const spotlightCategoriesApi = this.apiService.getAPI(
      `${this.slug}/spotlights/categories`
    );

    forkJoin([spotlightCategoriesApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        if(results[0].categories){
        this.tabName = results[0].categories;
        this.rows = `row-cols-lg-${this.tabName.length}`;
        this.defaultTab = this.tab = this.slug == '1851' ? results[0].defaultTab : results[0].categories[0].slug;
        this.apiService
          .getAPI(`${this.slug}/spotlight/${this.defaultTab}?limit=8&offset=0`)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((result) => {
            if(result.data[0]){
              const data: any[] = [];
              result['data'].forEach((item: any) => {
                data.push(item);
              });
              this.items = data;
              this.hasMore = result.has_more;
            } else{
              this.apiService
              .getAPI(`${this.slug}/spotlight/${this.tabName[0].slug}?limit=8&offset=0`)
              .pipe(takeUntil(this.onDestroy$))
              .subscribe((result) => {
                const data: any[] = [];
                result['data'].forEach((item: any) => {
                  data.push(item);
                });
                this.items = data;
                this.hasMore = result.has_more;
              });
            }
            this.isLoaded = true;
          });
        }
      });
  }
  setActiveTab(val: any, item: any) {
    this.activeTab = val;
    this.tab = item?.shortName;
    this.getData(this.tab);
  }
  getData(tabName: any) {
    const apiUrl = `${this.slug}/spotlight/${tabName.toLowerCase()}`;
    this.apiService
      .getAPI(`${apiUrl}?limit=8&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        const data: any[] = [];
        if (result.data.length) {
          result['data'].forEach((item: any, index: number) => {
            data.push(item);
          });
          this.items = data;
          this.hasMore = result.has_more;
        }
      });
  }
  getMore(tabName: any) {
    this.apiService
      .getAPI(
        `${this.slug}/spotlight/${tabName.toLowerCase()}?limit=4&offset=${
          this.items.length + 1
        }`
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result.data.length) {
          result['data'].forEach((item: any, index: number) => {
            this.items.push(item);
          });
          this.hasMore = result.has_more;
        }
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
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.commonService.resizeSidebar(event.target.innerWidth);
  }
}
