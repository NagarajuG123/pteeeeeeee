import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent implements OnInit {
  brandNews: Details[] = [];
  customOptions: OwlOptions = {};
  isLoaded: boolean = false;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  openVideoPlayer: boolean;
  url: string;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
    this.apiService
      .getAPI2(`articles/sponsored?limit=10&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.brandNews = result.data;
        if(this.brandNews.length > 0) {
          this.isLoaded = true;
        }
      });
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
          items: 3,
        },
        940: {
          items: 5,
        },
      },
    };
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function() {
        var $videoSrc;  
        $('.video-btn').click(function() {
            $videoSrc = $(this).data( "src" );
        });
        $("#brandModal").on('hide.bs.modal', function (e) {
          $("#brandModal iframe").attr("src", $("#brandModal iframe").attr("src"));
      });
       });
    
     }
   }
}
