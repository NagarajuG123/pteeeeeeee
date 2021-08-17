import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.apiService.getAPI(`${this.slug}/news`).subscribe((response) => {
      this.newsData = response;
      if (!this.newsData.data.length) {
        this.noData.emit();
      }
    });
  }

  readMore(item: any) {
    return this.commonService.readMore(item);
  }
}
