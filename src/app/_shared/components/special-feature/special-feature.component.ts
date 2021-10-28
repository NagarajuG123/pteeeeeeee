import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';

@Component({
  selector: 'app-special-feature',
  templateUrl: './special-feature.component.html',
  styleUrls: ['./special-feature.component.scss'],
})
export class SpecialFeatureComponent implements OnInit {
  @Input() apiUrl: string;
  @Input() slug: string;
  @Input() type: string;
  @Input() company: string;

  specialFeature: Details[] = [];
  isLoaded: boolean = false;
  brandInfoNews: any;
  title: string;
  fragment: string;
  constructor(
    private apiService: ApiService,
    public commonService: CommonService
  ) {}

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  ngOnInit(): void {
    this.apiService
      .getAPI(`${this.apiUrl}`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (this.slug === '1851' && response.data.stories.length > 0) {
          this.specialFeature = response.data.stories;
          this.fragment = 'dynamicpage';
          this.title = response.data.title;
        } else if (this.slug !== '1851' && response.data.length > 0) {
          this.specialFeature = response.data;
          this.fragment = 'featured';
        }
        this.isLoaded = true;
      });
    if (this.slug !== '1851') {
      this.apiService
        .getAPI(`info?slug=${this.slug}`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          this.brandInfoNews = response;
        });
    }
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
