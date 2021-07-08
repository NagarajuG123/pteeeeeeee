import { Component, OnInit } from '@angular/core';
import { Trending } from 'src/app/_core/models/trending';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-trendingbuzz',
  templateUrl: './trendingbuzz.component.html',
  styleUrls: ['./trendingbuzz.component.scss']
})
export class TrendingbuzzComponent implements OnInit {
  firstBlock: Trending[] = [];
  secondBlock: Trending[] =[];
  slug: string ='1851';
  hasMore: boolean = false;
  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending(){
    this.apiService.getAPI(`${this.slug}/trending-buzz?limit=30&offset=0`).subscribe((response ) =>{
      this.firstBlock = response.data.slice(0, 10);
      this.secondBlock = response.data.slice(10, 30);
      this.hasMore = response.has_more;
    });
  }
   getMoreData() {
    this.apiService.getAPI(`${this.slug}/trending-buzz?limit=10&offset=${this.secondBlock.length + 1}`)
    .subscribe(result => {
      this.hasMore = result.has_more;
      result.data.forEach((element: any) => {
        this.secondBlock.push(element);
      });
    });
  }
}
