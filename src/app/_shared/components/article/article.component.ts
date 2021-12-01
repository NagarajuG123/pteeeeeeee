import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() contents: any;
  @Input() type = '';
  @Input() typeSlug!: string;
  @Input() col!: string;

  rowClass: string;
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    this.rowClass = 'row-cols-lg-4 ';
    switch (this.col) {
      case '1':
        this.rowClass = 'row-cols-lg-1';
        break;
      case '2':
        this.rowClass = 'row-cols-lg-2';
        break;
      case '3':
        this.rowClass = 'row-cols-lg-3';
        break;
      case '4':
        this.rowClass = 'row-cols-lg-4';
        break;
      case '5':
        this.rowClass = 'row-cols-lg-5';
        break;
    }
  }
}
