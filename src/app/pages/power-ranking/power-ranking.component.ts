import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-power-ranking',
  templateUrl: './power-ranking.component.html',
  styleUrls: ['./power-ranking.component.scss']
})
export class PowerRankingComponent implements OnInit {
  contents: any = [];
  banner: any = [];
  constructor(    private apiService: ApiService,
) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getAPI(`1851/power-ranking`)
      .subscribe(result => {
        this.contents = result;
        this.banner = result.data;
      });
  }
}
