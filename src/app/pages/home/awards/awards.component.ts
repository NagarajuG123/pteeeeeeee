import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';

const AWARDS_KEY = makeStateKey<any>('awardState');

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  highlightItem: any = [];
  items: any = [];

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(private apiService: ApiService, private state: TransferState) {}

  ngOnInit(): void {
    const awards = this.state.get(AWARDS_KEY, null as any);

    if (!awards) {
      const awards: any = {};
      this.apiService
        .getAPI(`home-page-featured-content`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          if (response.data.stories.length > 0) {
            awards['highlightItem'] = response.data.stories[0];
            awards['items'] = response.data.stories;
          }
          this.state.set(AWARDS_KEY, awards);
        });
    } else {
      this.highlightItem = awards['highlightItem'];
      this.items = awards['items'];
    }
  }
}
