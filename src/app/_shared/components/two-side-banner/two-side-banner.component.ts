import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-two-side-banner',
  templateUrl: './two-side-banner.component.html',
  styleUrls: ['./two-side-banner.component.scss']
})
export class TwoSideBannerComponent implements OnInit {
  @Input() type = '';
  @Input() banner: any;
  @Input() date:any;
  openVideoPlayer = false;

  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    console.log(this.date)
  }
 isVideo(item:any) {
    if (typeof item !== 'undefined' && typeof item.media !== 'undefined' && item.media.type === 'video') {
          return true;
    }
    return false;
  }

  readMore(item: any) {
    return this.commonService.readMore(item, '');
  }
}
