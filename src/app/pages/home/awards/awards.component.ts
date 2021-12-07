import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  data: Details[] = [];
  result: string;
  faAngleRight = faAngleRight;
  isBrowser: boolean;
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
    this.apiService.getAPI(`home-page-featured-content`).subscribe((result) => {
      this.data = result.data.stories;
      this.result = result.data;
      this.isLoaded = true;
    });
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
}
