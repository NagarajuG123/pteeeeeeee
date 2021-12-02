import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
})
export class MostPopularComponent implements OnInit {
  @Input() type: string;
  @Input() slug: string;

  data: Details[] = [];
  faAngleRight = faAngleRight;
  isLoaded: boolean = false;
  isBrowser: boolean;

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
      .getAPI(`${this.slug}/trending?limit=9&offset=0`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (response.data.length) {
          this.data = response.data;
          this.isLoaded = true;
        }
      });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const minPerSlide = 3;
      const parent = document.querySelector(' .popular-inner');
      document.querySelectorAll('.popular-item').forEach(function (item) {
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
