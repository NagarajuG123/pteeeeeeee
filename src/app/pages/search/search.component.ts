import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { isPlatformBrowser, Location } from '@angular/common';
import { CommonService } from 'src/app/_core/services/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchInput!: string;
  specificSearchForm!: FormGroup;
  showSearchKey: String = 'SEARCH KEYWORD HERE';
  params!: string;
  publishedValue = -1;
  byAuthor: boolean = false;
  byTitle: boolean = false;
  byDesc: boolean = false;
  byKeywords: boolean = false;
  hasMore: boolean = false;
  isSpecificDate: boolean = false;
  isBrowser!: boolean;
  brandId: string = '';
  limit = 8;
  offset = 0;
  sortBy = 0;
  mainSearch: any;
  brandSearch: any;
  dateSelected: any;
  hiddenSearchBar: Boolean = false;
  publishedRange = 'SPECIFIC DATES';
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };
  publishedDuration: Array<any> = [
    {
      title: 'PAST 24 HOURS',
      value: 'past_24_hours',
    },
    {
      title: 'PAST 7 DAYS',
      value: 'past_7_days',
    },
  ];
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object,
    private location: Location,
    private commonService: CommonService
  ) {
    this.specificSearchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  updateSearchInput(input: string) {
    this.searchInput = input;
    this.showSearchKey = input;
    this.getDataByParams();
  }

  getDataByParams() {
    this.params = `?q=${this.searchInput}`;
    this.params =
      this.publishedValue !== -1
        ? `${this.params}&published_duration=${
            this.publishedDuration[this.publishedValue]['value']
          }`
        : this.params;
    this.params = this.byAuthor
      ? `${this.params}&filter_by[]=author`
      : this.params;
    this.params = this.byTitle
      ? `${this.params}&filter_by[]=title`
      : this.params;
    this.params = this.byDesc
      ? `${this.params}&filter_by[]=description`
      : this.params;
    this.params = this.byKeywords
      ? `${this.params}&filter_by[]=keywords`
      : this.params;
    this.params = this.limit
      ? `${this.params}&limit=${this.limit}`
      : this.params;
    this.params = `${this.params}&offset=0`;
    this.params = `${this.params}&brand_id=${this.brandId}`;

    let brandParams = this.params.replace(/brand_id/g, 'exclude_brand_id');
    brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
    brandParams = brandParams.replace(
      /offset=[0-9]*/g,
      `offset=${this.brandSearch.length}`
    );

    this.setData(brandParams);

    // this.updateUrlState();
  }

  onSearchSubmit(searchForm: FormGroup) {
    if (typeof this.dateSelected === 'undefined') {
      return;
    } else if (this.dateSelected.startDate === null) {
      return;
    } else {
      const start = moment(this.dateSelected.startDate).format('YYYY-MM-DD');
      const end = moment(this.dateSelected.endDate).format('YYYY-MM-DD');
      this.publishedValue = -1;

      this.params = `?q=${this.searchInput}`;
      this.params = this.byAuthor
        ? `${this.params}&filter_by[]=author`
        : this.params;
      this.params = this.byTitle
        ? `${this.params}&filter_by[]=title`
        : this.params;
      this.params = this.byDesc
        ? `${this.params}&filter_by[]=description`
        : this.params;
      this.params = this.byKeywords
        ? `${this.params}&filter_by[]=keywords`
        : this.params;
      this.params = this.limit
        ? `${this.params}&limit=${this.limit}`
        : this.params;
      this.params = `${this.params}&offset=0`;
      this.params = `${this.params}&published_from_date=${start}&published_to_date=${end}`;
      this.params = `${this.params}&brand_id=${this.brandId}`;

      let brandParams = this.params.replace(/brand_id/g, 'exclude_brand_id');
      brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
      brandParams = brandParams.replace(
        /offset=[0-9]*/g,
        `offset=${this.brandSearch.length}`
      );

      this.setData(brandParams);

      this.updateUrlState(start, end);
    }
  }
  updateUrlState(startDate = '', endDate = '') {
    let url = `searchpopup?search_input=${this.searchInput}&brand_id=${this.brandId}&by_author=${this.byAuthor}&by_title=${this.byTitle}&by_desc=${this.byDesc}&by_keywords=${this.byKeywords}`;
    url =
      this.publishedValue !== -1
        ? `${url}&published_duration=${this.publishedValue}`
        : `${url}&published_duration=`;
    url = this.isSpecificDate
      ? `${url}&published_from_date=${startDate}&published_to_date=${endDate}`
      : `${url}&published_from_date=&published_to_date=`;
    console.log(url);
    // this.location.replaceState(url);
  }
  hideSearchBar(status: string) {
    if (status === 'hidden') {
      this.hiddenSearchBar = true;
    } else {
      this.hiddenSearchBar = false;
    }
  }
  setDuration(key: number) {
    this.isSpecificDate = false;
    this.sortBy = -1;
    if (this.publishedValue === key) {
      this.publishedValue = -1;
    } else {
      this.publishedValue = key;
    }
    this.getDataByParams();
  }
  setRange() {
    this.isSpecificDate = true;
  }
  onChangeFilter(byFilter: any) {
    switch (byFilter) {
      case 'author':
        this.byAuthor = !this.byAuthor;
        break;
      case 'title':
        this.byTitle = !this.byTitle;
        break;
      case 'desc':
        this.byDesc = !this.byDesc;
        break;
      case 'keyword':
        this.byKeywords = !this.byKeywords;
        break;
      default:
        break;
    }
    this.getDataByParams();
  }
  readMore(item: any) {
    return this.commonService.readMore(item, 'most-recent');
  }
  readMoreBrand(item: any) {
    return this.commonService.readMore(item, 'brand-latest-stories');
  }
  getMoreItems() {
    this.params = this.limit
      ? `${this.params}&limit=${this.limit}`
      : this.params;
    this.params = `${this.params}&offset=${this.mainSearch.length}`;

    let brandParams = this.params.replace(/brand_id/g, 'exclude_brand_id');
    brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
    brandParams = brandParams.replace(
      /offset=[0-9]*/g,
      `offset=${this.brandSearch.length}`
    );
    this.setData(brandParams);
  }
  setData(brandParams: any) {
    this.apiService.getAPI(`search${this.params}`).subscribe((result) => {
      if (result.data !== null) {
        this.offset += result['data'].length;
        result['data'].forEach((article: any) => {
          this.mainSearch.push(article);
        });
        this.mainSearch = JSON.parse(JSON.stringify(this.mainSearch));
      }
      this.apiService.getAPI(`search${brandParams}`).subscribe((response) => {
        if (response.data !== null) {
          response['data'].forEach((article: any) => {
            this.brandSearch.push(article);
          });
          this.brandSearch = JSON.parse(JSON.stringify(this.brandSearch));
        }
        this.hasMore = result.has_more || response.has_more;
      });
    });
  }
}
