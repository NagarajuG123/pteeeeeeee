import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CommonService } from 'src/app/_core/services/common.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const RESULT_KEY = makeStateKey<any>('homefeatureState');

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss'],
})
export class HomeFeatureComponent implements OnInit {
  franchiseData: any = [];
  highlightItem: any;
  item: any;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private tstate: TransferState,
  ) {}

  ngOnInit(): void {
    this.getFranchise();
  }

  getFranchise() {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const featureData = this.tstate.get(RESULT_KEY, {});
      this.highlightItem = featureData['highlightItem'];
      this.item = featureData['item'];
      this.franchiseData = featureData['franchiseData'];
    } else {
      const featureData = {};
      this.apiService
      .getAPI(`home-page-featured-content`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        featureData['item'] = response;
        if (response.data.stories.length > 0) {
          featureData['highlightItem'] = response.data.stories[0];
          featureData['franchiseData'] = response.data.stories.slice(1, 6);
        }
        this.tstate.set(RESULT_KEY, featureData);
      });
    } 
  }

  readMore(item: any) {
    return this.commonService.readMore(item);
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}