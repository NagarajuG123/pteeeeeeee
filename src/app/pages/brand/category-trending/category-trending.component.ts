import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-category-trending',
  templateUrl: './category-trending.component.html',
  styleUrls: ['./category-trending.component.scss'],
})
export class CategoryTrendingComponent implements OnInit {
  @Input('data') data = [];
  @Input('subTitle') subTitle = '';
  isBrowser: boolean;
  slideConfig: any;
  constructor(
    private commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.slideConfig = { slidesToShow: 3, slidesToScroll: 1 };
  }
  readMore(item: any) {
    return this.commonService.readMore(item, this.subTitle);
  }
}
