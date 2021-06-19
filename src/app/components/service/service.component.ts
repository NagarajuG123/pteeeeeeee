import { InvokeMethodExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  franchiseData: any = [];
  highlightItem: any = [];
  items: any =[];
  item : any = [];
  index:number = 0;

  constructor( private apiService:ApiService) { }

  ngOnInit(): void {
    this.getFranchise();
  }

  getFranchise() {
    let slug='1851';
    this.apiService.getAPI(`home-page-featured-content`).subscribe((response ) =>{
      this.franchiseData = response;
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
}
