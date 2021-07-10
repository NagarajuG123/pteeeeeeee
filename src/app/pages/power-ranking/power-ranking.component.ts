import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-power-ranking',
  templateUrl: './power-ranking.component.html',
  styleUrls: ['./power-ranking.component.scss']
})
export class PowerRankingComponent implements OnInit {
  data: any = [];
  contents: any = [];
  constructor(    private apiService: ApiService,
    private metaService: MetaService
) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getAPI(`1851/power-ranking`)
      .subscribe(result => {
        this.data = result;
        this.contents = result.data;
        this.metaService.setSeo(result.meta);
      });
  }
}
