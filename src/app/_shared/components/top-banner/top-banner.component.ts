import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss'],
})
export class TopBannerComponent implements OnInit {
  @Input() data: any = [];
  @Input() title: any;
  constructor() {}

  ngOnInit(): void {}
}
