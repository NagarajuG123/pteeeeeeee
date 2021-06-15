import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trendingData: any =[];

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending() {
    this.apiService.getTrending().subscribe((response) => {
      this.trendingData = response;
      console.log(this.trendingData);
    });
  }

}
