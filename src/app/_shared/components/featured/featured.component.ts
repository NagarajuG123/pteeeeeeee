import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const RESULT_KEY = makeStateKey<any>('featureState');

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() apiUrl!: string;

  isBrowser: boolean;
  data: Details[] = [];
  news: Details[] = []
  slug: string = '';
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(private apiService: ApiService,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
    this.slug = '1851';
    this.getFeatured();
  }

  getFeatured(){
    if (this.tstate.hasKey(RESULT_KEY)) {
      const featureData = this.tstate.get(RESULT_KEY, {});
      this.data = featureData['data'];
      this.news = featureData['news'];
    } else {
      const featureData:any = {}

      const feature_api = this.apiService.getAPI(`${this.apiUrl}?limit=4&offset=0`);
      const news_api = this.apiService.getAPI(`${this.slug}/news?limit=10&offset=0`);
      forkJoin([feature_api,news_api]).pipe(takeUntil(this.onDestroy$)).subscribe((response) =>{
        featureData['data'] = response[0].data;
        featureData['news'] = response[1].data;
      });
      
    this.tstate.set(RESULT_KEY, featureData);
   }
  }
}
