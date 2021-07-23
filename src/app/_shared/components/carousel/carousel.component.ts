import {
  Component,
  OnInit,
  Input,
  PLATFORM_ID,
  Inject,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Output() noData = new EventEmitter();

  isBrowser: boolean = false;
  showCarousel: boolean = true;
  readMoreLink = '';
  list: any = [];
  openVideoPlayer = false;
  url: string = '';
  slideConfig: any;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
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
      if (response && response.data) {
        this.list = response.data;

        if (!this.list.length) {
          this.slideConfig = {};
          this.noData.emit();
        } else {
          this.slideConfig = {
            slidesToShow:
              this.list.length > 2 ? 3 : this.list.length > 1 ? 2 : 1,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 620,
                settings: {
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: this.list.length > 1 ? 2 : 1,
                },
              },
            ],
          };
        }
      }
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
