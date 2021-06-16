import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trending-buzz',
  templateUrl: './trending-buzz.component.html',
  styleUrls: ['./trending-buzz.component.scss']
})
export class TrendingBuzzComponent implements OnInit {
  trending: any = [];

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTrendingBuzz();
  }

  getTrendingBuzz() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/trending-buzz`).subscribe((response ) =>{
      this.trending = response;
      console.log(this.trending);
    });
  }

}
