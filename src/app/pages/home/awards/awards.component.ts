import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  @Input() type: string;
  @Input() class: string;
  @Input() fragment: string;

  data: Details[] = [];
  result: Details[] = [];
  openVideoPlayer: boolean;
  url: string;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  customOptions: OwlOptions = {};
  isLoaded: boolean = false;
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object,
    public commonService: CommonService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setConfig();
      this.apiService.getAPI2(`articles/awards?limit=10&offset=0`).subscribe((result) => {
        if(result.data !== null) {
          this.result = result;
          this.data = result.data;
          if(this.data.length > 0) {
            this.isLoaded = true;
          }
        }
      });
  
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
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function() {
        var $videoSrc;
        $('.video-btn').click(function() {
            $videoSrc = $(this).data("src");
          });
        $('#awardModal').on('hide.bs.modal', function() {
          $("#awardModal iframe").attr("src", $("#awardModal iframe").attr("src"));
        });
        
    });
    }
  }
}
