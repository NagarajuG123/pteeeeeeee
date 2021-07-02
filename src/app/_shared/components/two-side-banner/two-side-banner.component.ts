import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-two-side-banner',
  templateUrl: './two-side-banner.component.html',
  styleUrls: ['./two-side-banner.component.scss']
})
export class TwoSideBannerComponent implements OnInit {
  @Input() type = '';
  @Input() banner:any;
  constructor() { }

  ngOnInit(): void {
  }

}
