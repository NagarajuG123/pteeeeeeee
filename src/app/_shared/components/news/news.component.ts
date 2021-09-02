import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsData: any = [];
  @Input() slug = '1851';
  @Input() type = '';
  @Output() noData = new EventEmitter();

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private tstate: TransferState,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    console.log('News');
    this.getNews();
  }

  getNews() {
    const RESULT_KEY = makeStateKey<any>(`featuredState`);
    if (this.tstate.hasKey(RESULT_KEY)) {
      console.log('if');
      const newsData = this.tstate.get(RESULT_KEY, {});
      this.newsData = newsData['data'];
      console.log(this.newsData);
    }
    else{
      console.log('else');
      const newsData = {};
      this.apiService.getAPI(`${this.slug}/news`).pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
      newsData['data'] = response;
      if (!newsData['data'].data.length) {
        this.noData.emit();
      }
      this.tstate.set(RESULT_KEY, newsData);
     });  
    }
  }

  readMore(item: any) {
    return this.commonService.readMore(item);
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
