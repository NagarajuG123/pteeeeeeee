import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  constructor() {}
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    margin: 5,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="assets/img/slider-left-arrow.png"/>',
      '<img src="assets/img/slider-right-arrow.png"/>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 5,
      },
    },
    nav: true,
  };
  ngOnInit(): void {}
}
