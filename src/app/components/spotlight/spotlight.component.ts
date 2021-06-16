import { Component, OnInit } from '@angular/core';
import { SpotlightService } from 'src/app/services/spotlight.service';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss']
})
export class SpotlightComponent implements OnInit {
  peopleData: any = [];
  franchiseeData: any = [];
  franchisorData: any = [];
  industryData: any = [];
  columnsData: any = [];
  slug = '1851';

  constructor(private apiService: SpotlightService ) { }

  ngOnInit(): void {
    this.getPeopleSpotlight();
    this.getFranchiseeSpotlight();
    this.getFranchisorSpotlight();
    this.getColumnSpotlight();
    this.getIndustrySpotlight();
  }

  getPeopleSpotlight() {
    this.apiService.getPeopleSpotlight().subscribe((response) => {
      this.peopleData = response;
      console.log(this.peopleData);
    });
  }

  getFranchiseeSpotlight() {
    this.apiService.getFranchiseeSpotlight().subscribe((response) => {
      this.franchiseeData = response;
      console.log(this.franchiseeData);
    });
  }

  getFranchisorSpotlight() {
    this.apiService.getFranchisorSpotlight().subscribe((response) => {
      this.franchisorData = response;
      console.log(this.franchisorData);
    });
  }

  getIndustrySpotlight() {
    this.apiService.getIndustrySpotlight().subscribe((response) => {
      this.industryData = response;
      console.log(this.industryData);
    });
  }

  getColumnSpotlight() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/columns`).subscribe((response ) =>{
      this.columnsData = response;
      console.log(this.columnsData);
    });
    // this.apiService.getColumnSpotlight().subscribe((response) => {
    //   this.columnsData = response;
    //   console.log(this.columnsData);
    // });
  }
}
