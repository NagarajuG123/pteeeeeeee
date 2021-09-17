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
  @Input() data: any;
  @Input() item: any;

  openVideoPlayer = false;
  typeSlug: string;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
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
    if (this.type == 'monthlydetails') {
      this.typeSlug = 'monthlydetailspage';
    } else if (this.type === 'dynamicPage') {
      this.typeSlug = 'dynamicpage';
    } else if (this.type === 'trendingbrandbuzz') {
      this.typeSlug = 'trendingbrandbuzz';
    }
    return this.commonService.readMore(item);
  }
}
