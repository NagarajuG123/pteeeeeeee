import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() type = '';
  @Input() title = '';
  @Input() slug = '1851';
  showCarousel: boolean = true;
  readMoreLink = '';
  list: any = [];
  openVideoPlayer = false;
  url: string = '';
  customOptions: OwlOptions = {};
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.customOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      margin: 10,
      navSpeed: 700,
      responsiveRefreshRate: 500,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 3,
        },
      },
      nav: true,
    };

    let apiUrl = '';
    switch (this.type) {
      case 'trending':
        apiUrl = `${this.slug}/trending`;
        this.readMoreLink = '/trendingbrandbuzz';
        break;

      case 'columns':
        apiUrl = `${this.slug}/columns?limit=10&offset=0`;
        this.readMoreLink = '/columns';
        break;

      case 'main-videos':
        apiUrl = `${this.slug}/videos?site=1851`;
        break;

      default:
        break;
    }
    this.apiService.getAPI(apiUrl).subscribe((response) => {
      this.list = response.data;
      this.showCarousel = this.list.length > 0 ? true : false;
    });
  }

  goReadMore(item: any) {
    let typeSlug = '',
      brandSlug = '';
    switch (this.type) {
      case 'trending':
        typeSlug = 'trending';
        break;
      case 'columns':
        typeSlug = 'columns';
        break;
      case 'main-videos':
        typeSlug = 'main-videos';
        break;
      default:
        break;
    }
    if (typeof item.brand !== 'undefined' && item.brand.slug !== '1851') {
      brandSlug = `${item.brand.slug}/`;
    }
    return `${brandSlug}${item.slug}/#${typeSlug}`;
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
}
