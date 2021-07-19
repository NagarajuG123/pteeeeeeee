import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  adsData: any = [];
  @Input() slug = '1851';
  @Input() type = '';
  @Input() pageType = '';
  slideConfig: any;
  isBrowser: boolean = false;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getAds();
    this.slideConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 300000,
      dots: false,
      prevArrow: false,
      nextArrow: false,
      draggable: false,
    };
  }

  getAds() {
    this.apiService.getAPI(`${this.slug}/ads`).subscribe((result) => {
      result.data.forEach((ads: { type: string }) => {
        if (ads.type === this.type) {
          this.adsData.push(ads);
        }
      });
    });
  }
}
