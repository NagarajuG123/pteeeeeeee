import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
  isSlider: boolean = false;
  constructor(
    private commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    const trending: SimpleChange = changes.data;

    if (trending.currentValue.length !== 0) {
      this.isSlider = true;
      this.data = trending.currentValue;
      this.slideConfig = {
        slidesToShow: this.data.length > 2 ? 3 : this.data.length > 1 ? 2 : 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 620,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: this.data.length > 1 ? 2 : 1,
            },
          },
        ],
      };
    }
  }
  ngOnInit(): void {}
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
}
