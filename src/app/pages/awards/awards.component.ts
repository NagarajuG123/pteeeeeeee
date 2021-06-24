import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  awardsData: any = [];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    console.log('Awards');
    this.getAwards();
  }

  getAwards(){
    this.apiService.getAPI(`home-page-featured-content`).subscribe((response ) =>{
      this.awardsData = response;
      console.log(this.awardsData);
    });
  }

}
