import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  awardsData: any = [];
  slug = '1851';

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAwards();
  }

  getAwards(){
    this.apiService.getAPI(`${this.slug}/home-page-featured-content?limit=10&offset=0`).subscribe((response ) =>{
      this.awardsData = response;
    });
  }
}
