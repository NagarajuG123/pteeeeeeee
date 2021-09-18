import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
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
  featuredData: Details[] =[];
  mostRecent: Details[] = [];

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
    const FEATURE_KEY = makeStateKey<any>('featureState');
    const featured = this.state.get(FEATURE_KEY, null as any);
    if (!featured) {
      const featureApi = this.apiService.getAPI(`${this.apiUrl}?limit=4&offset=0`);
      const mostRecentApi = this.apiService.getAPI(`1851/${this.slug}/most-recent?limit=12&offset=0`);
      const metaApi = this.apiService.getAPI(`1851/${this.slug}/most-recent`);

      const featured: any = {};
      forkJoin([featureApi, mostRecentApi, metaApi])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          featured['data'] = results[0].data;
          featured['mostRecent'] = results[1].data;
          this.metaService.setSeo(results[2].data);
          this.state.set(FEATURE_KEY, featured as any);
        });
    } else {
      this.featuredData = featured['data'];
      this.mostRecent = featured['mostRecent'];
    }
  }

}