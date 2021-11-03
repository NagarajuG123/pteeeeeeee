import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import 'lazysizes';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  public innerWidth: any;

  videoData: Details[] = [];
  url: string;
  openVideoPlayer = false;
  isBrowser: boolean = false;
  isLoaded: boolean = false;
  s3Url = environment.s3Url;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.apiService
      .getAPI(`1851/videos?site=1851`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.videoData = result.data;
        this.isLoaded = true;
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
      const minPerSlide = 4;
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
