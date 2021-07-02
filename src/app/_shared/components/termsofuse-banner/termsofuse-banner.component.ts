import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/fiveColumn';

@Component({
  selector: 'app-termsofuse-banner',
  templateUrl: './termsofuse-banner.component.html',
  styleUrls: ['./termsofuse-banner.component.scss']
})
export class TermsofuseBannerComponent implements OnInit {
  @Input() data: FiveColumn[] = [];
  @Input() title!: string  ;

  imgURL = 'assets/img/subscribepage-banner.jpg';
  isShow = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const data: SimpleChange = changes.data;

    if (typeof data.currentValue !== 'undefined' && typeof data.currentValue.media !== 'undefined') {
      this.imgURL = data.currentValue.media.url;
    }
    if (typeof data.currentValue !== 'undefined' &&  typeof data.currentValue.title !== 'undefined') {
      this.title = data.currentValue.title;
    }
    if (data.currentValue !== data.previousValue) {
      this.isShow = true;
    }
  }
}
