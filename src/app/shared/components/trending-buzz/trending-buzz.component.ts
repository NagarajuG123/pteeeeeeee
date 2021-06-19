import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-trending-buzz',
  templateUrl: './trending-buzz.component.html',
  styleUrls: ['./trending-buzz.component.scss']
})
export class TrendingBuzzComponent implements OnInit {
  trending: any = [];
  slug: string = '1851';

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTrendingBuzz();
  }

  getTrendingBuzz() {
    this.apiService.getAPI(`${this.slug}/trending-buzz?limit=10&offset=0`).subscribe((response ) =>{
      this.trending = response;
    });
  }

}
