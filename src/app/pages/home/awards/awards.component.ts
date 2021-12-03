import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

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
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object,
    public commonService: CommonService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.apiService.getAPI(`home-page-featured-content`).subscribe((result) => {
      this.data = result.data.stories;
      this.result = result.data;
    });
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      const minPerSlide = 5;
      const parent = document.querySelector('.award-inner');
      if (parent) {
        document.querySelectorAll('.award-item').forEach(function (item) {
          console.log(document.querySelectorAll('.award-item'));
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
