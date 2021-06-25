import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  awardsData: any = [];
  stories: any = [];
  dynamicStories : any = [];
  dynamicData: any = [];
  url: string | undefined;

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getHomeFeatured();
  }

  getHomeFeatured(){
    this.apiService.getAPI(`home-page-featured-content`).subscribe((response ) =>{
      this.awardsData = response;
      this.url = response.data.url;
      this.stories = response.data.stories;
      this.apiService.getAPI(`page/${this.url}`).subscribe((response ) =>{
        console.log(this.url);
        this.dynamicData = response;
        this.dynamicStories = response.data.stories;
      });
    });
  }


}
