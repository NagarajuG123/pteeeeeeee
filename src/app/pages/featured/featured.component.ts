import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  awardsData: any = [];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAwards();
  }

  getAwards(){
    this.apiService.getAPI(`home-page-featured-content`).subscribe((response ) =>{
      this.awardsData = response;
    });
  }

}
