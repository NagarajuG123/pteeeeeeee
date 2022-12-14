import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Brandsrank } from 'src/app/_core/models/brandsrank.model';
import { Powerranking } from 'src/app/_core/models/powerranking.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-power-ranking',
  templateUrl: './power-ranking.component.html',
  styleUrls: ['./power-ranking.component.scss'],
})
export class PowerRankingComponent implements OnInit {
  data: Powerranking[] = [];
  contents: Brandsrank = {};
  metaData: Meta[] = [];
  items: Brandsrank[] = [];
  s3Url = environment.s3Url;
  oddRows = [0, 1, 4, 5, 8, 9];
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    const powerApi = this.apiService.getAPI2(`powerranking`);

    forkJoin([powerApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.data = result[0];
        this.contents = result[0].data;
        this.items = result[0].data.brands;
        this.metaData = result[0].data.meta;
        this.metaService.setSeo(this.metaData);
      });
  }
}
