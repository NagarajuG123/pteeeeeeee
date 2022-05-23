import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @Input() slug: string;
  @Input() type: string;
  @Input() stories: Details[] = [];

  data: Details[] = [];
  openVideoPlayer: boolean;
  url: string;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  customOptions: OwlOptions = {};
  isLoaded: boolean = false;
  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setConfig();
      if(this.slug) {
        this.apiService
        .getAPI(`${this.slug}/videos`)
        .subscribe((result) => {
          this.data = result.data;
          if(this.data) {
            this.isLoaded = true;
          }
        });
      } else {
        this.apiService
        .getAPI2(`videos`)
        .subscribe((result) => {
          this.data = result.data;
          if(this.data) {
            this.isLoaded = true;
          }
        });
      }        
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  setConfig() {
    this.customOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      nav: true,
      lazyLoad : true,
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
          items: 4,
        },
        940: {
          items: 5,
        },
      },
    };
  }
  getTitle() {
    let title = 'Covering the franchise industry';
    if(this.commonService?.publication?.id == 'Stachecow') {
      title = 'Covering everything personal wealth and finance';
    }
    else if(this.commonService?.publication?.id == 'EE') {
      title = 'Covering everything real estate';
    }
    else if(this.commonService?.publication?.id == 'ROOM-1903') {
      title = 'Covering everything travel & hospitality';
    }
    return title;
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function() {
        var $videoSrc;
        $('.video-btn').click(function() {
            $videoSrc = $(this).data("src");
        });
        $('#videoModal').on('hide.bs.modal', function(e) {
            $("#video").attr('src', $videoSrc);
        })   
    });
    }
  }
}
