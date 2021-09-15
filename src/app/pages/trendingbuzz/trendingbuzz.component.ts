import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-trendingbuzz',
  templateUrl: './trendingbuzz.component.html',
  styleUrls: ['./trendingbuzz.component.scss'],
})
export class TrendingbuzzComponent implements OnInit {
  firstBlock: any;
  secondBlock: any;
  slug: string = '1851';
  hasMore: boolean = false;
  constructor(
    private apiService: ApiService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending() {
    this.apiService
      .getAPI(`${this.slug}/trending-buzz?limit=30&offset=0`)
      .subscribe((response) => {
        this.metaService.setSeo(response.data[0].meta);
        this.firstBlock = response.data.slice(0, 10);
        this.secondBlock = response.data.slice(10, 30);
        this.hasMore = response.has_more;
        this.apiService
          .getAPI(`1851/publication-instance`)
          .subscribe((result) => {
            this.metaService.setTitle(`Trending Brand Buzz | ${result.title}`);
          });
      });
  }
  getMoreData() {
    this.apiService
      .getAPI(
        `${this.slug}/trending-buzz?limit=10&offset=${
          this.secondBlock.length + 10
        }`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.forEach((element: any) => {
          this.secondBlock.push(element);
        });
      });
  }
}
