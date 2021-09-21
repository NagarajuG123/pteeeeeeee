import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-trending-top',
  templateUrl: './trending-top.component.html',
  styleUrls: ['./trending-top.component.scss']
})
export class TrendingTopComponent implements OnInit {
  trendingNews: Details[] = [];
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(private apiService: ApiService) { }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    animateOut: 'slideOutDown',
    animateIn: 'slideInDown',
    navText: [
      '<img src="assets/img/slider-left-arrow.png" width="7px" height="15px" alt="slider arrow"/>',
      '<img src="assets/img/slider-right-arrow.png" width="7px" height="15px" alt="slider arrow"/>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.apiService.getAPI(`1851/trending?limit=10&offset=0`).
    pipe(takeUntil(this.onDestroy$)).subscribe((result) =>{
      this.trendingNews = result.data;
    })
  }

}
