import { Component, Input, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

const RESULT_KEY = makeStateKey<any>('specialFeatureState');

@Component({
  selector: 'app-special-feature',
  templateUrl: './special-feature.component.html',
  styleUrls: ['./special-feature.component.scss'],
})
export class SpecialFeatureComponent implements OnInit {
  @Input() apiUrl: string;
  @Input() slug: string;
  specialFeature: any = [];

  constructor(
    private apiService: ApiService,
    private tstate: TransferState,
    public commonService: CommonService
  ) {}

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const specialFeature = this.tstate.get(RESULT_KEY, {});
      this.specialFeature = specialFeature['data'];
    } else {
      const specialFeature = {};
      this.apiService
        .getAPI(`${this.apiUrl}`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          if (this.slug === '1851' && response.data.stories.length > 0) {
            specialFeature['data'] = response.data.stories;
          } else if(this.slug !== '1851' && response.data.length > 0) {
            specialFeature['data'] = response.data;
          }
          this.tstate.set(RESULT_KEY, specialFeature);
        });
    }
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
