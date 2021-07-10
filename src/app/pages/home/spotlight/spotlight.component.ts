import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss'],
})
export class SpotlightComponent implements OnInit {
  isBrowser!: boolean;
  items: any = [];
  highlightItem: any;
  selectedTab: any;
  scrollbarOptions: any;
  selectedIndex: number = 0;
  tabs:any;

  
  constructor(
    private apiService: ApiService, private commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object,
    ) {this.isBrowser = isPlatformBrowser(platformId); }

  ngOnInit(): void {
    this.getCategories();
    this.setScrollOption();
     
    this.apiService.getAPI(`1851/publication-instance`).subscribe(async (response) => {
      if ( response.id === 'EE' ) {
        this.selectedTab = 'celebrities';
      } else {
        this.selectedTab = 'people';
      }
      this.getInitialData();
    });
  }

  getInitialData() {
     this.apiService.getAPI(`1851/spotlight/${this.selectedTab}?limit=11&offset=0`)
       .subscribe(result => {
         if (result.data.length > 0) {
           this.highlightItem = result.data[0];
           this.items = result.data.slice(1,11);
        }
    });
  }
  setScrollOption() {
    this.scrollbarOptions = {
        axis: 'y',
        theme: 'minimal-dark',
        callbacks: {
          onTotalScroll: () => {
            this.getMoreItem();
          }
        }
     };
  }
  getCategories() {
    this.apiService
      .getAPI(`1851/spotlights/categories`)
      .subscribe((response) => {
        this.tabs = response.categories.map((category: string) => category.toLowerCase().replace(/ /g, '-'));
      });
  }
 
  selectTab(tab: any, index: number) {
    this.selectedTab = tab;
    this.selectedIndex = index;
    this.getData(this.selectedTab, 10, 0);
  }
  selectTabMobile(tab: any, index: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectTab(tab, index);
    }
  }
  sanitizeTab( tab: string ) {
    return tab.replace(/-/g, ' ');
  }
  getMoreItem() {
    this.getData(this.selectedTab, 10, this.items.length, false);
  }
   getData(tab: any, limit: number, offset: number, firstLoad: boolean = true) {
    if (firstLoad) {
      this.items = [];
    }
    this.apiService.getAPI(`1851/spotlight/${tab}?limit=${limit}&offset=${offset}`)
      .subscribe(result => {
        if (result.data.length) {
          result['data'].forEach((item: any, index: number) => {
          if (index === 0) {
            if (firstLoad) {
              this.highlightItem = item;
            }
          } else {
            this.items.push(item);
          }
        });
        }
      });
  }
  readMore(item: any) {
    return this.commonService.readMore(item, this.selectedTab );
  }
}