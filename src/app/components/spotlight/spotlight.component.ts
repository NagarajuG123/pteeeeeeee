import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService ) { }

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
    this.apiService.getColumnSpotlight().subscribe((response) => {
      this.columnsData = response;
      console.log(this.columnsData);
    });
  }
}
