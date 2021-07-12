import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

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
  has_more: any = [];
  invest_values: any;
  story_values: any = '';
  brand_values: any = '';
  industry_values: any = '';
  items: Array<object> = [];
  sortBrand_value = 'asc';
  sortInvest_value = 'asc';
  sortIndustry_value = 'asc';
  sortStory_value = 'asc';
  search_key: any;

  constructor(private apiService: ApiService) { }

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
    this.getSearchData();
  }

  ngOnChanges(changes: SimpleChanges) {
    const search_input: SimpleChange = changes.search_input;

    if (search_input.currentValue !== search_input.previousValue && this.search_key !== search_input.currentValue) {
      this.search_key = search_input.currentValue;
      this.getSearchData();
    }
  }
  
  selectAllIndustry() {
    this.industry_values = '';
    this.industry_keys.forEach((key, i) => {
      key['isChecked'] = true;
      this.industry_values += `&industries[]=${key['value']}`;
    });
    this.getSearchData();
  }

  selectAllInvest() {
    this.invest_values = '';
    this.invest_keys.forEach((key, i) => {
      key['isChecked'] = true;
      this.invest_values += `&investments[][from]=${key['min']}&investments[][to]=${key['max']}`;
    });
    this.getSearchData();
  }

  clearAllIndustry() {
    this.industry_values = '';
    this.industry_keys.forEach((key, i) => {
      key['isChecked'] = false;
    });
    this.getSearchData();
  }

  clearAllInvest() {
    this.invest_values = '';
    this.invest_keys.forEach((key, i) => {
      key['isChecked'] = false;
    });
    this.getSearchData();
  }
  onChangeInvestFilter(index) {
    this.invest_keys[index]['isChecked'] = !this.invest_keys[index]['isChecked'];
    this.invest_values = '';
    this.invest_keys.forEach((key, i) => {
      if (key['isChecked']) {
        this.invest_values += `&investments[][from]=${key['min']}&investments[][to]=${key['max']}`;
      }
    });
    this.getSearchData();
  }

  onChangeIndustryFilter(index) {
    this.industry_keys[index]['isChecked'] = !this.industry_keys[index]['isChecked'];
    this.industry_values = '';
    this.industry_keys.forEach((key, i) => {
      if (key['isChecked']) {
        this.industry_values += `&industries[]=${key['value']}`;
      }
    });
    this.getSearchData();
  }

  onChangeBrandFilter(index) {
    this.brand_keys[index]['isChecked'] = !this.brand_keys[index]['isChecked'];
    this.brand_values = [];
    this.brand_keys.forEach((key, i) => {
      if (key['isChecked']) {
        this.brand_values.push(key['value']);
      }
    });
    this.getSearchData();
  }

  onChangeStoryFilter(index) {
    this.story_keys[index]['isChecked'] = !this.story_keys[index]['isChecked'];
    this.story_values = [];
    this.story_keys.forEach((key, i) => {
      if (key['isChecked']) {
        this.story_values.push(key['value']);
      }
    });
    this.getSearchData();
  }
  getIndustry(industry) {
    let list = '';
    for (let i = 0; i < industry.length; i++) {
      if (i !== 0) {
        list += `, ${industry[i].name}`;
      } else {
        list += industry[0].name;
      }
    }
    return list;
  }

  sortBrand() {
    if (this.sortBrand_value === 'asc') {
      this.sortBrand_value = 'desc';
    } else {
      this.sortBrand_value = 'asc';
    }
    this.getSearchData();
  }

  sortInvest() {
    if (this.sortInvest_value === 'asc') {
      this.sortInvest_value = 'desc';
    } else {
      this.sortInvest_value = 'asc';
    }
    this.getSearchData();
  }

  sortIndustry() {
    if (this.sortIndustry_value === 'asc') {
      this.sortIndustry_value = 'desc';
    } else {
      this.sortIndustry_value = 'asc';
    }
    this.getSearchData();
  }

  sortStory() {
    if (this.sortStory_value === 'asc') {
      this.sortStory_value = 'desc';
    } else {
      this.sortStory_value = 'asc';
    }
    this.getSearchData();
  }


  getSearchData() {
    const sortValue = `&sort=${this.sortBrand_value === 'asc' ? 'brand' : '-brand'}`;
     this.params = `?q=${this.search_input}${this.invest_values}${this.industry_keys}${sortValue}&limit=10&offset=0`;
      this.apiService.getAPI(`brand-search${this.params}`).subscribe((result) => {
      this.industry_keys = result.data.industry;
      this.invest_keys = result.data.investment;
      this.items = result.data;
      this.has_more = result.has_more;
    });
  }
}


