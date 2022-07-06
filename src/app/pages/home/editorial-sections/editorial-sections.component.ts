import { Component, OnInit, HostListener, Input } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-editorial-sections',
  templateUrl: './editorial-sections.component.html',
  styleUrls: ['./editorial-sections.component.scss'],
})
export class EditorialSectionsComponent implements OnInit {
  @Input() slug: string;

  items: Details[] = [];
  tabName: any;
  defaultTab!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  isLoaded: boolean = false;
  s3Url = environment.s3Url;
  rows: any;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    public commonService: CommonService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const spotlightCategoriesApi = this.apiService.getAPI2(
      `category/tab`
    );

    forkJoin([spotlightCategoriesApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.tabName = results[0].categories;
        this.rows = `row-cols-lg-${this.tabName.length}`;
        this.defaultTab = this.tab = results[0].defaultTab;
        let apiUrl = `articles/editorial?categorySlug=${this.defaultTab}&limit=10&offset=0`;
        if(this.slug) {
          apiUrl = `articles/editorial?slug=${this.slug}&categorySlug=${this.defaultTab}&limit=10&offset=0`;
        }
        this.apiService
          .getAPI2(apiUrl)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((result) => {
            const data: any[] = [];
            result['data'].forEach((item: any) => {
              data.push(item);
            });
            this.items = data;
            if(this.items.length > 0) {
              this.isLoaded = true;
            }
          });
      });
  }

  setActiveTab(val: any, item: any) {
    this.activeTab = val;
    this.tab = item?.slug;
    this.getData(this.tab);
  }
  getData(tabName: any) {
    let apiUrl = `articles/editorial?categorySlug=${tabName.toLowerCase()}&limit=10&offset=0`;
        if(this.slug) {
          apiUrl = `articles/editorial?slug=${this.slug}&categorySlug=${tabName.toLowerCase()}&limit=10&offset=0`;
        }
    this.apiService
      .getAPI2(apiUrl)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        const data: any[] = [];
        if (result.data.length) {
          result['data'].forEach((item: any) => {
            data.push(item);
          });
          this.items = data;
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
