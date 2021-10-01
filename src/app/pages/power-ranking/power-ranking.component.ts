import { Component, OnInit } from '@angular/core';
import { makeStateKey, Meta, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Brandsrank } from 'src/app/_core/models/brandsrank.model';
import { Powerranking } from 'src/app/_core/models/powerranking.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import 'lazysizes';

const RESULT_KEY = makeStateKey<any>('powerRankingState');

@Component({
  selector: 'app-power-ranking',
  templateUrl: './power-ranking.component.html',
  styleUrls: ['./power-ranking.component.scss'],
})
export class PowerRankingComponent implements OnInit {
  data: Powerranking[] = [];
  contents: Brandsrank = {};
  metaData: Meta[] = [];
  publication!: any;
  items: Brandsrank[] = [];

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    private tstate: TransferState
  ) {}

  ngOnInit(): void {
    // if (this.tstate.hasKey(RESULT_KEY)) {
    //   const powerRankingData: any = this.tstate.get(RESULT_KEY, {});
    //   this.data = powerRankingData['data'];
    //   this.contents = powerRankingData['contents'];
    //   this.items = powerRankingData['contents'].brands;
    //   this.metaData = powerRankingData['meta'];
    //   this.publication = powerRankingData['publicationTitle'];
    // } else {
    //   const powerRankingData: any = {};
    const powerApi = this.apiService.getAPI(`1851/power-ranking`);
    const publicationApi = this.apiService.getAPI('1851/publication-instance');

    forkJoin([powerApi, publicationApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.data = result[0];
        this.contents = result[0].data;
        this.items = result[0].data.brands;
        this.metaData = result[0].meta;
        this.publication = result[1].title;
        this.metaService.setSeo(this.metaData);
        this.metaService.setTitle(
          `Power Rankings | Franchise Brands | ${this.publication.title}`
        );
      });
    //   this.tstate.set(RESULT_KEY, powerRankingData);
    // }
  }
}
