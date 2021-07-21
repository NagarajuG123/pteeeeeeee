import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() type = '';
  @Input() title = '';
  @Input() slug = '1851';
  isBrowser: boolean = false;
  showCarousel: boolean = true;
  readMoreLink = '';
  list: any = [];
  openVideoPlayer = true;
  url: string = '';
  slideConfig: any;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.slideConfig = { slidesToShow: 3, slidesToScroll: 1 };

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

    if (typeof item !== 'undefined' && item?.brand?.slug !== '1851') {
      brandSlug = `${item?.brand?.slug}/`;
    }
    return `${brandSlug}${item?.slug}/#${typeSlug}`;
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
}
