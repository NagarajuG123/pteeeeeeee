import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
})
export class MostPopularComponent implements OnInit {
  @Input() type: string;
  @Input() slug: string;

  data: Details[] = [];
  customOptions: OwlOptions = {};
  faAngleRight = faAngleRight;
  isLoaded: boolean = false;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.setOption();
    this.getMostPopular();
  }

  getMostPopular() {
    this.apiService
      .getAPI(`${this.slug}/trending?limit=9&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (response.data.length) {
          this.data = response.data;
          this.isLoaded = true;
        }
      });
  }
  setOption() {
    this.customOptions = {
      autoplay: false,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: [
        `<img src="${environment.s3Url}left-arrow.svg" alt="slider arrow" />`,
        `<img src="${environment.s3Url}right-arrow.svg" alt="slider arrow" />`,
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
          items: 3,
        },
      },
      nav: true,
    };
  }
}
