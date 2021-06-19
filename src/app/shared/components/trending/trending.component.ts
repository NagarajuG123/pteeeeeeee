import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trendingData: any =[];
  slug: string = '1851';

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending() {
    this.apiService.getAPI(`${this.slug}/trending`).subscribe((response ) =>{
      this.trendingData = response;
    });
  }

}
