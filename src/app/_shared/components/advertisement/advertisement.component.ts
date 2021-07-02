import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  adsData: any = [];
  @Input() slug = '1851';
  @Input() type = '';
  @Input() pageType = '';

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
     autoplay: true,
    navText: [
      '',
      '',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    this.apiService.getAPI(`${this.slug}/ads`).subscribe((result) => {
       result.data.forEach( (ads: { type: string; }) => {
            if (ads.type === this.type) {
              this.adsData.push(ads);
            }
       });
    });
  }
}
