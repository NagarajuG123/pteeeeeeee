import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { forkJoin, Subject } from 'rxjs';
import { CommonService } from 'src/app/_core/services/common.service';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
})
export class MostPopularComponent implements OnInit {
  @Input() type: string;
  @Input() slug: string;
  @Input() apiUrl: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() class!: string;
  @Input() class2!: string;
  @Input() fragment:string;
  
  data: Details[] = [];
  isLoaded: boolean = false;
  isBrowser: boolean;
  customOptions: OwlOptions = {};
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
    const mostPopular = this.apiService.getAPI2(`${this.apiUrl}`);
    forkJoin([ mostPopular])
    .subscribe((response) => {
      if (response[0].data && response[0].data.length) {
        this.data = response[0].data;
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
          items: 1,
        },
        740: {
          items: 3,
        },
        940: {
          items: 3,
        },
      },
    };
  }
  formatTitle(title) {
    let text = title;
    if (text.length > 150) {
      text = text.substring(0, 150) + '...';
   }
   return text;
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function() {
        var $videoSrc;  
        $('.video-btn').click(function() {
            $videoSrc = $(this).data( "src" );
        });
        $(".modal").on('hide.bs.modal', function (e) {
          $(".modal iframe").attr("src", $(".modal iframe").attr("src"));
      });
       });
    
     }
   }
 }
