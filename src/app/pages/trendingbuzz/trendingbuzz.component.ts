import { Component, OnInit } from '@angular/core';
import { Trending } from 'src/app/_core/models/trending';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-trendingbuzz',
  templateUrl: './trendingbuzz.component.html',
  styleUrls: ['./trendingbuzz.component.scss']
})
export class TrendingbuzzComponent implements OnInit {
  trendingData: Trending[] =[];
  slug: string ='1851';

  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending(){
    this.apiService.getAPI(`${this.slug}/trending-buzz?limit=20&offset=0`).subscribe((response ) =>{
      this.trendingData = response.data;
      // this.dynamicStories = response.data.stories;
    });
  }
}
