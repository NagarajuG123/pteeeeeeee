import { Component, Input, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';

const TRENDING_KEY = makeStateKey<any>('trendingState');

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  @Input() slug: string;
  data: Details[] = [];

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
      '<img src="assets/img/slider-left-arrow.png" alt="slider arrow"/>',
      '<img src="assets/img/slider-right-arrow.png" alt="slider arrow"/>',
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

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(private state: TransferState, private apiService: ApiService) {}

  ngOnInit(): void {
    const data = this.state.get(TRENDING_KEY, null as any);
    if (data != null) {
      this.data = data;
    } else {
      const trending = this.apiService.getAPI(
        `${this.slug}/trending?limit=9&offset=0`
      );
      const data: any = {};
      forkJoin([trending])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          this.data = results[0].data;
          this.state.set(TRENDING_KEY, results[0].data as any);
        });
    }
  }
}
