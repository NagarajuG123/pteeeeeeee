import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() slug!: string;
  @Input() apiUrl: string;

  isBrowser: boolean;
  featuredData: any[] =[];
  mostRecent: Details[] = [];
  openVideoPlayer: boolean = false;
  url: string;
  titleLimit = 50;
  titleLimitOptions = [
    { width: 1200, limit: 85 },
    { width: 992, limit: 30 },
  ];
  descriptionLimit = 200;
  descriptionLimitOptions = [
    { width: 1200, limit: 200 },
    { width: 992, limit: 100 },
  ];

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    private state: TransferState,
    public commonService: CommonService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
      const featureApi = this.apiService.getAPI(`${this.apiUrl}?limit=4&offset=0`);
      const mostRecentApi = this.apiService.getAPI(`1851/${this.slug}/most-recent?limit=12&offset=0`);
      const metaApi = this.apiService.getAPI(`1851/${this.slug}/most-recent`);

      forkJoin([featureApi, mostRecentApi, metaApi])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          this.featuredData  = results[0].data;
          this.mostRecent  = results[1].data;
          this.metaService.setSeo(results[2].data);
        });
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }

  setLimitValues(Options,fieldName) {
    let limitVal = 0;
    Options.forEach((item) => {
      if (window.innerWidth < item.width) {
        limitVal = item.limit;
      }
    });
    if (Number(limitVal) === 0) {
      limitVal = Number(Options[0].limit);
    }
    switch (fieldName) {
      case 'titleLimit':
        this.titleLimit = Number(limitVal);
        break;
      case 'descriptionLimit':
        this.descriptionLimit = Number(limitVal);
        break;
      default:
        break;
    }  
  }

  async setLimit(event: any) {
    await this.setLimitValues(this.titleLimitOptions,'titleLimit');
    await this.setLimitValues(this.descriptionLimitOptions,'descriptionLimit');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setLimit(event);
  }

}