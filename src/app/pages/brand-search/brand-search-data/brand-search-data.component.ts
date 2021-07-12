import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-search-data',
  templateUrl: './brand-search-data.component.html',
  styleUrls: ['./brand-search-data.component.scss']
})
export class BrandSearchDataComponent implements OnInit {
  story_keys: Array<object> = [];
  brand_keys: Array<object> = [];
  invest_keys: Array<object> = [];
  industry_keys: Array<object> = [];
  params: any = [];
  search_input: any = [];

  constructor() { }

  ngOnInit(): void {
    this.industry_keys = [
      {
        name: 'Beauty',
        value: 'beauty',
        isChecked: false,
      },
      {
        name: 'Construction',
        value: 'construct',
        isChecked: false,
      },
      {
        name: 'Consultant',
        value: 'consult',
        isChecked: false,
      },
      {
        name: 'Consumer Goods',
        value: 'congoods',
        isChecked: false,
      },
      {
        name: 'Consumer Services',
        value: 'conservice',
        isChecked: false,
      },
      {
        name: 'Education',
        value: 'education',
        isChecked: false,
      },
      {
        name: 'Facilities Services',
        value: 'facility',
        isChecked: false,
      },
      {
        name: 'Finance',
        value: 'finance',
        isChecked: false,
      },
      {
        name: 'Food & Beverage',
        value: 'food',
        isChecked: false,
      },
      {
        name: 'Healthcare',
        value: 'health',
        isChecked: false,
      }
    ];
    this.invest_keys = [
      {
        min: 0,
        max: 9999,
        isChecked: false,
      },
      {
        min: 10000,
        max: 99999,
        isChecked: false,
      },
      {
        min: 100000,
        max: 999999,
        isChecked: false,
      },
      {
        min: 1000000,
        max: 9999999,
        isChecked: false,
      },
      {
        min: 10000000,
        max: 99999999,
        isChecked: false,
      }
    ];

    this.brand_keys = [
      {
        name: 'BRAND PAGE1',
        value: 'brand1',
        isChecked: false,
      },
      {
        name: 'BRAND PAGE2',
        value: 'brand2',
        isChecked: false,
      },
      {
        name: 'BRAND PAGE3',
        value: 'brand3',
        isChecked: false,
      },
      {
        name: 'BRAND PAGE4',
        value: 'brand4',
        isChecked: false,
      },
      {
        name: 'BRAND PAGE5',
        value: 'brand5',
        isChecked: false,
      },
      {
        name: 'BRAND PAGE6',
        value: 'brand6',
        isChecked: false,
      },
    ];

    this.story_keys = [
      {
        name: 'Story1',
        value: 'story1',
        isChecked: false,
      },
      {
        name: 'Story2',
        value: 'story2',
        isChecked: false,
      },
      {
        name: 'Story3',
        value: 'story3',
        isChecked: false,
      },
      {
        name: 'Story4',
        value: 'story4',
        isChecked: false,
      },
      {
        name: 'Story5',
        value: 'story5',
        isChecked: false,
      },
      {
        name: 'Story6',
        value: 'story6',
        isChecked: false,
      },
    ];
    this.getSearch();
  }

  getSearch(){
    this.params = `?q=${this.search_input}&sort=brand&limit=10&offset=0`;
  }
}


