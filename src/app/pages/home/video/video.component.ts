import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import 'lazysizes';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  videoData: Details[] = [];
  videoUrl: string;
  url: string;
  openVideoPlayer = false;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(private state: TransferState, private apiService: ApiService) {}
  customOptions: OwlOptions = {
    autoplay: false,
    loop: true,
    margin: 5,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="assets/img/slider-left-arrow.png" alt="slider arrow" width="15px" height="30px"/>',
      '<img src="assets/img/slider-right-arrow.png" alt="slider arrow" width="15px" height="30px"/>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1024: {
        items: 5,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.apiService
      .getAPI(`1851/videos?site=1851`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.videoData = result.data;
        this.videoUrl = result.data?.media?.url;
      });
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  ngAfterViewInit(){
    $('.modal').on('hidden.bs.modal', function(){
      $('.modal').hide();
      $('.modal iframe').attr("src", jQuery(".modal iframe").attr("src"));
    });
  }
}
