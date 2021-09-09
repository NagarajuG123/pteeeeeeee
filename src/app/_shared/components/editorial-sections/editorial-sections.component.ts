import { Component, OnInit, HostListener } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/_core/models/category.model';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

const RESULT_KEY = makeStateKey<any>('editorialState');

@Component({
  selector: 'app-editorial-sections',
  templateUrl: './editorial-sections.component.html',
  styleUrls: ['./editorial-sections.component.scss'],
})
export class EditorialSectionsComponent implements OnInit {
  items: Details[] = [];
  tabName: any;
  defaultTab!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  tab!: string;
  
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(public commonService: CommonService,
    private tstate: TransferState,
    private apiService:ApiService) {}

  ngOnInit(): void {
    if(this.tstate.hasKey(RESULT_KEY)){
      const editorialData = this.tstate.get(RESULT_KEY,{});
      this.items = editorialData['items'];
      this.tabName = editorialData['tabsName'];
      this.defaultTab = editorialData['default'];
    } else{
      const editorialData: any = {};
      const spotlightCategoriesApi = this.apiService.getAPI(`1851/spotlights/categories`);
      const publicationApi = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([spotlightCategoriesApi, publicationApi])
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(results => {
      editorialData['tabsName'] = results[0].categories;
      editorialData['default'] = results[0].defaultTab;
    
      this.apiService.getAPI(`1851/spotlight/${editorialData['default']}?limit=10&offset=0`)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(result => {
            const data: any[] = [];
            result['data'].forEach((item: any) => {
               data.push(item);
          });
          editorialData['items'] = data;
            this.tstate.set(RESULT_KEY, editorialData);
      });
    });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.commonService.resizeSidebar(event.target.innerWidth);
  }
  setActiveTab(val: any,item: any) {
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
  getData(tab: any){
    this.apiService.getAPI(`1851/spotlight/${tab}?limit=10&offset=0`)
    .subscribe(result => {
      if (result.data.length) {
        result['data'].forEach((item: any, index: number) => {
          this.items.push(item);
        });
      }
    });
  }
}