import { Component, OnInit } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-trendingbuzz',
  templateUrl: './trendingbuzz.component.html',
  styleUrls: ['./trendingbuzz.component.scss'],
})
export class TrendingbuzzComponent implements OnInit {
  trendingData: Details[] = [];
  slug: string = '1851';
  hasMore: boolean = false;
  faAngleRight = faAngleRight;
  isLoaded: boolean;
  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending() {
    this.apiService
      .getAPI(`${this.slug}/trending-buzz?limit=10&offset=0`)
      .subscribe((response) => {
        this.metaService.setSeo(response.data[0].meta);
        this.trendingData = response.data;
        this.hasMore = response.has_more;
        this.isLoaded = true;
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
        `${this.slug}/trending-buzz?limit=5&offset=${this.trendingData.length}`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.forEach((element: any) => {
          this.trendingData.push(element);
        });
      });
  }
}
