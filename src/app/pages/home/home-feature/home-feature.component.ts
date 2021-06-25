import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss']
})
export class HomeFeatureComponent implements OnInit {
  franchiseData: any = [];
  highlightItem: any = [];
  items: any =[];
  item : any = [];
  index:number = 0;
  readMoreUrl: string | undefined;

  constructor( private apiService:ApiService) { }

  ngOnInit(): void {
    this.getFranchise();
  }

  getFranchise() {
    this.apiService.getAPI(`home-page-featured-content?limit=10&offset=0`).subscribe((response ) =>{
      this.franchiseData = response;
      this.readMoreUrl = response.data.url;
      if(response.data){
        response.data.stories.forEach((item: any,index: number) => {
          if(index < 6){
                if(index == 0)
                {
                  this.franchiseData['highlight'] = item;  
                }
                else if(index != 0){
                  this.franchiseData['items'] = item;
                }
              } 
              this.highlightItem = this.franchiseData['highlight'];
              this.items = this.franchiseData['items'];
        }); 
      }
    });
  }

  goLegalPlayers(url: any) {
    return url;
  }
}
