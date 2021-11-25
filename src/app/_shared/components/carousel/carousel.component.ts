import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() Data: any;
  @Input() type: string;
  @Input() title: string;
  openVideoPlayer: boolean;
  url: string;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  isLoaded: boolean;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.isLoaded = true;
  }

  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $('.modal').on('hidden.bs.modal', function () {
        $('.modal').hide();
        $('.modal iframe').attr('src', $('.modal iframe').attr('src'));
      });
      const minPerSlide = 6;
      const parent = document.querySelector('.carousel-inner');

      document.querySelectorAll('.carousel-item').forEach(function (item) {
        let next = item.nextElementSibling;
        if (!next) {
          next = parent.querySelector('.carousel-item');
        }
        let clone = next.querySelector('div').cloneNode(true);
        item.appendChild(clone);

        for (var i = 0; i < minPerSlide; i++) {
          next = next.nextElementSibling;
          if (!next) {
            next = parent.querySelector('.carousel-item');
          }
          clone = next.querySelector('div').cloneNode(true);
          item.appendChild(clone);
        }
      });
    }
  }
}
