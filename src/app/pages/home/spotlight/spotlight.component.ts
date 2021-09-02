import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const RESULT_KEY = makeStateKey<any>('spotlightState');

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
  publication: any = [];

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  
  constructor(
    private apiService: ApiService, private commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object,
    private tstate: TransferState,
    ) {this.isBrowser = isPlatformBrowser(platformId); }

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const spotlightData = this.tstate.get(RESULT_KEY, {});
          this.highlightItem = spotlightData['highlightItem'];
          this.items = spotlightData['items'];
          this.tabs = spotlightData['categories'];
          this.selectedTab = spotlightData['selectedTab'];
          this.setScrollOption();
    }
    else{
      const spotlightData = {};

      const categoriesApi = this.apiService.getAPI(`1851/spotlights/categories`);
      const publicationApi = this.apiService.getAPI(`1851/publication-instance`);

      forkJoin([categoriesApi, publicationApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(results => {
        if ( results[0] && results[0]['categories'] ) {
          results[0]['categories'] = results[0]['categories'].map( (category: string) => category.toLowerCase().replace(/ /g, '-') );

          if ( results[1].id === 'EE' ) {
            this.selectedTab = 'celebrities';
          } else {
            this.selectedTab = 'people';
          }
          spotlightData['selectedTab'] = this.selectedTab;
        }

        spotlightData['categories'] = results[0]['categories'];
        
        this.apiService.getAPI(`1851/spotlight/${this.selectedTab}?limit=11&offset=0`)
        .subscribe(result => {
          if (result.data.length > 0) {
            spotlightData['highlightItem'] = result.data[0];
            spotlightData['items'] = result.data.slice(1,11);
         }
         this.tstate.set(RESULT_KEY, spotlightData);
         });
      });
    }
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
    return this.commonService.readMore(item);
  }
  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
