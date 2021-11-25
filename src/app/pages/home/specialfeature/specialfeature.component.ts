import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-specialfeature',
  templateUrl: './specialfeature.component.html',
  styleUrls: ['./specialfeature.component.scss']
})
export class SpecialfeatureComponent implements OnInit {
  @Input() apiUrl: string;
  @Input() slug: string;
  @Input() type: string;
  @Input() company: string;

  specialFeature: Details[] = [];
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
        }
      });
  }
  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }

}