import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';


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

  constructor(private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getPeopleSpotlight();
    this.getFranchiseeSpotlight();
    this.getFranchisorSpotlight();
    this.getColumnSpotlight();
    this.getIndustrySpotlight();
  }


  getPeopleSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/people?limit=10&offset=0`).subscribe((response ) =>{
      this.peopleData = response;
    });
  }

  getFranchiseeSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/franchisee?limit=10&offset=0`).subscribe((response ) =>{
      this.franchiseeData = response;
    });
  }

  getFranchisorSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/franchisor?limit=10&offset=0`).subscribe((response ) =>{
      this.franchisorData = response;
    });
  }

  getIndustrySpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/industry?limit=10&offset=0`).subscribe((response ) =>{
      this.industryData = response;
    });
  }

  getColumnSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/columns?limit=10&offset=0`).subscribe((response ) =>{
      this.columnsData = response;
    });
  }
}
