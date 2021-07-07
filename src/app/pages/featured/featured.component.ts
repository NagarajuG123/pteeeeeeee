import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  
  dynamicStories : any = [];
  dynamicData: any = [];
  url: string | undefined;
  pgurl!: string;

  constructor( private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getHomeFeatured();
  }

  getHomeFeatured(){
    this.apiService.getAPI(`home-page-featured-content`).subscribe((response ) =>{
      this.url = response.data.url;
      this.pgurl = 'page' + this.url;
      this.apiService.getAPI(`${this.pgurl}?limit=20&offset=0`).subscribe((response ) =>{
        this.dynamicData = response;
        this.dynamicStories = response.data.stories;
      });
    });
  }

  readMore(item: any) {
    return this.commonService.readMore(item);
  }
}