import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-article-component',
  templateUrl: './article-component.component.html',
  styleUrls: ['./article-component.component.scss']
})
export class ArticleComponentComponent implements OnInit {
  @Input() contents: any;
  @Input() type = '';
  @Input() typeSlug!: string;

  
  constructor(public commonService: CommonService) { }
  
  ngOnInit(): void {
  }

}
