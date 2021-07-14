import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-two-side-banner',
  templateUrl: './two-side-banner.component.html',
  styleUrls: ['./two-side-banner.component.scss'],
})
export class TwoSideBannerComponent implements OnInit {
  @Input() type = '';
  @Input() banner: any;
  @Input() date: any;
  openVideoPlayer = false;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    console.log(this.date);
  }
  isVideo(item: any) {
    if (
      typeof item !== 'undefined' &&
      typeof item.media !== 'undefined' &&
      item.media.type === 'video'
    ) {
      return true;
    }
    return false;
  }

  readMore(item: any) {
    let tag;
    if (this.type == 'monthlydetails') {
      tag = 'people';
    } else if (this.type === 'dynamicPage') {
      tag = 'dynamicPage';
    } else if (this.type === 'trendingbrandbuzz') {
      tag = 'trendingbrandbuzz';
    }
    return this.commonService.readMore(item, tag);
  }
}
