import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss'],
})
export class SpotlightComponent implements OnInit {
  active = 1;
  peopleData: any = [];
  franchiseeData: any = [];
  franchisorData: any = [];
  industryData: any = [];
  columnsData: any = [];
  slug = '1851';
  highlightPeople: any = [];
  highlightFranchise: any = [];
  hightlightFranchisor: any = [];
  highlightIndustry: any = [];
  hightlightColumn: any = [];
  constructor(private apiService: ApiService, private commonService:CommonService) {}

  ngOnInit(): void {
    this.getPeopleSpotlight();
    this.getFranchiseeSpotlight();
    this.getFranchisorSpotlight();
    this.getColumnSpotlight();
    this.getIndustrySpotlight();
  }

  getPeopleSpotlight() {
    this.apiService
      .getAPI(`${this.slug}/spotlight/people?limit=10&offset=0`)
      .subscribe((response) => {
        this.peopleData = response;
        if (response.data) {
          this.highlightPeople = response.data[0];
        }
      });
  }

  getFranchiseeSpotlight() {
    this.apiService
      .getAPI(`${this.slug}/spotlight/franchisee?limit=10&offset=0`)
      .subscribe((response) => {
        this.franchiseeData = response;
        if (response.data) {
          this.highlightFranchise = response.data[0];
        }
      });
  }

  getFranchisorSpotlight() {
    this.apiService
      .getAPI(`${this.slug}/spotlight/franchisor?limit=10&offset=0`)
      .subscribe((response) => {
        this.franchisorData = response;
        if (response.data) {
          this.hightlightFranchisor = response.data[0];
        }
      });
  }

  getIndustrySpotlight() {
    this.apiService
      .getAPI(`${this.slug}/spotlight/industry?limit=10&offset=0`)
      .subscribe((response) => {
        this.industryData = response;
        if (response.data) {
          this.highlightIndustry = response.data[0];
        }
      });
  }

  getColumnSpotlight() {
    this.apiService
      .getAPI(`${this.slug}/spotlight/columns?limit=10&offset=0`)
      .subscribe((response) => {
        this.columnsData = response;
        if (response.data) {
          this.hightlightColumn = response.data[0];
        }
      });
  }

  readMore(item: any) {
    return this.commonService.readMore(item, '');
  }
}
