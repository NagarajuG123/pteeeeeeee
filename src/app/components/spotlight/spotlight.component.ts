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
  highlightPeople: any =[];
  highlightFranchise: any =[];
  hightlightFranchisor: any =[];
  highlightIndustry: any =[];
  hightlightColumn: any =[];
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
      if(response['data']){
        this.peopleData['highlight'] = response['data'][0];
      }
      this.highlightPeople = this.peopleData['highlight'];
    });
  }

  getFranchiseeSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/franchisee?limit=10&offset=0`).subscribe((response ) =>{
      this.franchiseeData = response;
      if(response['data']){
        this.franchiseeData['highlight'] = response['data'][0];
      }
      this.highlightFranchise = this.franchiseeData['highlight'];
    });
  }

  getFranchisorSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/franchisor?limit=10&offset=0`).subscribe((response ) =>{
      this.franchisorData = response;
      if(response['data']){
        this.franchisorData['highlight'] = response['data'][0];
      }
      this.hightlightFranchisor = this.franchisorData['highlight'];
    });
  }

  getIndustrySpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/industry?limit=10&offset=0`).subscribe((response ) =>{
      this.industryData = response;
      if(response['data']){
        this.industryData['highlight'] = response['data'][0];
      }
      this.highlightIndustry = this.industryData['highlight'];
    });
  }

  getColumnSpotlight() {
    this.apiService.getAPI(`${this.slug}/spotlight/columns?limit=10&offset=0`).subscribe((response ) =>{
      this.columnsData = response;
      if(response['data']){
        this.columnsData['highlight'] = response['data'][0];
      }
      this.hightlightColumn = this.columnsData['highlight'];
    });
  }
}
