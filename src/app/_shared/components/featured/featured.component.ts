import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
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
  slug: string = '1851';
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(private apiService: ApiService,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
    this.getFeatured();
  }

  getFeatured(){
    if (this.tstate.hasKey(RESULT_KEY)) {
      const featureData = this.tstate.get(RESULT_KEY, {});
      this.data = featureData['data'];
      this.news = featureData['news'];
    } else {
      const featureData:any = {}

      this.apiService
      .getAPI(`${this.apiUrl}?limit=4&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        featureData['data'] = response.data;
      });

      this.apiService
      .getAPI(`1851/news?limit=10&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        featureData['news'] = response.data;
      });
      
    this.tstate.set(RESULT_KEY, featureData);
   }
  }
}
