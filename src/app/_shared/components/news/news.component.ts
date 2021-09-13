import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
      this.apiService.getAPI(`${this.slug}/news`).pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        this.newsData = response;
      if (!this.newsData.data.length) {
        this.noData.emit();
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
