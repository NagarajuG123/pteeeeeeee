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
    this.getDynamic();
    
  }

  getHomeFeatured(){
    this.apiService.getAPI(`home-page-featured-content`).subscribe((response ) =>{
      const homeData =[];
      this.awardsData = response;
      this.awardsData['url'] = response.data.url;
      this.url = this.awardsData['url'];
      this.stories = response.data.stories;
      if (this.awardsData && Object.keys(this.awardsData).length) {
        const legalPlayerData = this.awardsData.url;
        console.log(legalPlayerData);
        this.url = legalPlayerData;
      }
    });
  }

  getDynamic(){
    this.apiService.getAPI(`page/${this.url}`).subscribe((response ) =>{
      console.log(this.url);
      this.dynamicData = response;
      this.dynamicStories = response.data.stories;
    });
  }

}
