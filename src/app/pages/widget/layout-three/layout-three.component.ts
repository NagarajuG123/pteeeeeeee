import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-layout-three',
  templateUrl: './layout-three.component.html',
  styleUrls: ['./layout-three.component.scss']
})
export class LayoutThreeComponent implements OnInit {
  @Input() class: string;
  @Input() widget: any;
  customOptions: OwlOptions = {};

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.customOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 3,
        },
        940: {
          items: 3,
        },
      },
    };
  }
  formatTitle(title) {
    let text = title;
    if (text.length > 150) {
      text = text.substring(0, 150) + '...';
   }
   return text;
  }
}
