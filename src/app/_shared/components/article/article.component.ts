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
  @Input() class!: string;

  rowClass: string;
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {}
}
