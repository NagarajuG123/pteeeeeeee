import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

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
    let slug='1851';
    this.apiService.getAPI(`${slug}/trending`).subscribe((response ) =>{
      this.trendingData = response;
      console.log(this.trendingData);
    });
  }

}
