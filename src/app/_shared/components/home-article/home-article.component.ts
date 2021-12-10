import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-home-article',
  templateUrl: './home-article.component.html',
  styleUrls: ['./home-article.component.scss']
})
export class HomeArticleComponent implements OnInit {
  @Input() contents: any;
  @Input() typeSlug!: string;
  @Input() col!: string;
  @Input() class!: string;
  @Input() type!: string;
  rowClass: string;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
