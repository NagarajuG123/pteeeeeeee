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
  hasMore: boolean = false;
  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending(){
    this.apiService.getAPI(`${this.slug}/trending-buzz?limit=30&offset=0`).subscribe((response ) =>{
      this.trendingData = response.data;
      this.hasMore = response.has_more;
    });
  }
   getMoreData() {
    this.apiService.getAPI(`${this.slug}/trending-buzz?limit=10&offset=${this.trendingData.length + 11}`)
    .subscribe(result => {
      this.hasMore = result.has_more;
      result.data.forEach((element: any) => {
        this.trendingData.push(element);
      });
    });
  }
}
