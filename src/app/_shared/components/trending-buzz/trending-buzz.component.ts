import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';

const RESULT_KEY = makeStateKey<any>(`trendingbuzzState`);

@Component({
  selector: 'app-trending-buzz',
  templateUrl: './trending-buzz.component.html',
  styleUrls: ['./trending-buzz.component.scss']
})
export class TrendingBuzzComponent implements OnInit {
  trending: any = [];
  slug: string = '1851';

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  
  constructor( private apiService: ApiService,private tstate: TransferState,) { }

  ngOnInit(): void {
    this.getTrendingBuzz();
  }

  getTrendingBuzz() {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const trendingData = this.tstate.get(RESULT_KEY, {});
      this.trending = trendingData['data'];
    }
    else{
      const trendingData = {};
      this.apiService.getAPI(`${this.slug}/trending-buzz?limit=10&offset=0`).pipe(takeUntil(this.onDestroy$))
      .subscribe((response ) =>{
        trendingData['data'] = response;
      });
      this.tstate.set(RESULT_KEY, trendingData);
    }
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
