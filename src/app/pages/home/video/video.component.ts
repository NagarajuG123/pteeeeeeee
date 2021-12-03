import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  data: Details[] = [];
  openVideoPlayer: boolean;
  url: string;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const videoData = this.apiService
      .getAPI(`1851/videos?site=1851`)
      .subscribe((result) => {
        this.data = result.data;
      });
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
      const minPerSlide = 5;
      const parent = document.querySelector('.video-inner');
      if (parent) {
        document.querySelectorAll('.video-item').forEach(function (item) {
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
}
