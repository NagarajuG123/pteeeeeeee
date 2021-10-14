import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { faAngleDown,faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  @Input() slug: string;
  data: Details[] = [];
  isLoaded: boolean = false;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(
    private apiService: ApiService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.isPageLoaded.subscribe((res) => {
      if (res) {
        this.isLoaded = true;
      }
    });
    const trending = this.apiService.getAPI(
      `${this.slug}/trending?limit=9&offset=0`
    );
    forkJoin([trending])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.data = results[0].data;
      });
  }
}
