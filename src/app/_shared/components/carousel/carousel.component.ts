import { Component, OnInit,Input,PLATFORM_ID,Inject } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() type = '';
  @Input() title = '';
  @Input() slug = '1851';
  readMoreLink = '';
  list: any = [];
  isBrowser: boolean;
  openVideoPlayer = false;
  url:string = '';
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};


  constructor(private apiService: ApiService,
  @Inject(PLATFORM_ID) platformId: Object,) {
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
    this.apiService.getAPI(apiUrl).subscribe((response ) =>{
      this.list = response.data;
      console.log(this.list)
    });
  }

  
   goReadMore(item:any) {
    let type_slug = '',
      brand_slug = '';
    switch (this.type) {
      case 'trending':
        type_slug = 'trending';
        break;
      case 'columns':
        type_slug = 'columns';
        break;
      case 'main-videos':
        type_slug = 'main-videos';
        break;
      default:
        break;
    }
    if (typeof item.brand !== 'undefined' && item.brand.slug !== '1851') {
      brand_slug = `${item.brand.slug}/`;
    }
    return `${brand_slug}${item.slug}`;
   }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
}
