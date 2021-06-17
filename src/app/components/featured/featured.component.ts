import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  featuredData: any = [];

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFeatured();
  }

  getFeatured() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/featured-articles`).subscribe((response ) =>{
      this.featuredData = response;
    });
  }
}
