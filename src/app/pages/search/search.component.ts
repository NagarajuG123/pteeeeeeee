import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { isPlatformBrowser, Location } from '@angular/common';
import { CommonService } from 'src/app/_core/services/common.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  specificSearchForm: FormGroup;
  isBrowser: boolean;
  paramsSubscription: any;
  recentPeoples: Array<any> = [];
  brandPeoples: Array<any> = [];
  rows: Array<string> = ['', '', '', '', '', ''];
  search_input: String = '';
  sort_by = 0;
  published_value = -1;
  by_author: Boolean = false;
  by_title: Boolean = false;
  by_desc: Boolean = false;
  by_keywords: Boolean = false;
  brand_id: String = '';
  sort_keys: Array<object> = [
    {
      title: 'NEWEST',
      value: 'newest',
    },
    {
      title: 'OLDEST',
      value: 'oldest',
    },
  ];
  published_duration: Array<object> = [
    {
      title: 'PAST 24 HOURS',
      value: 'past_24_hours',
    },
    {
      title: 'PAST 7 DAYS',
      value: 'past_7_days',
    },
  ];

  published_range = 'SPECIFIC DATES';
  limit = 8;
  offset = 0;
  params = '';
  isSpecificDate: boolean = false;
  dateSelected: any;
  alwaysShowCalendars: boolean;
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
  showSearchKey: String = 'SEARCH KEYWORD HERE';
  has_more: Boolean = true;
  hiddenSearchBar: Boolean = false;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object,
    private cdref: ChangeDetectorRef,
    private location: Location
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.specificSearchForm = new FormGroup({
      search_input: new FormControl(''),
    });
  }

  ngOnInit() {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      if (
        typeof params.search_input !== 'undefined' &&
        params.search_input !== ''
      ) {
        this.search_input = params.search_input;
        this.showSearchKey = params.search_input;
      }
      if (typeof params.sort_by !== 'undefined' && params.sort_by !== '') {
        this.sort_by = parseInt(params.sort_by, 10);
        this.published_value = -1;
        this.isSpecificDate = false;
      }
      if (typeof params.by_author !== 'undefined' && params.by_author !== '') {
        this.by_author = params.by_author === 'true' ? true : false;
      }
      if (typeof params.by_title !== 'undefined' && params.by_title !== '') {
        this.by_title = params.by_title === 'true' ? true : false;
      }
      if (typeof params.by_desc !== 'undefined' && params.by_desc !== '') {
        this.by_desc = params.by_desc === 'true' ? true : false;
      }
      if (
        typeof params.by_keywords !== 'undefined' &&
        params.by_keywords !== ''
      ) {
        this.by_keywords = params.by_keywords === 'true' ? true : false;
      }
      if (
        typeof params.published_duration !== 'undefined' &&
        params.published_duration !== ''
      ) {
        this.published_value = parseInt(params.published_duration, 10);
        this.sort_by = -1;
        this.isSpecificDate = false;
      }
      // tslint:disable-next-line:max-line-length
      if (
        typeof params.published_from_date !== 'undefined' &&
        typeof params.published_to_date !== 'undefined' &&
        params.published_from_date !== '' &&
        params.published_to_date !== ''
      ) {
        this.isSpecificDate = true;
        this.sort_by = -1;
        this.published_value = -1;
      }
      if (typeof params.brand_id !== 'undefined' && params.brand_id !== '') {
        this.brand_id = params.brand_id;
      } else {
        this.brand_id = '1851';
      }

      const searchPopData = {};
      let apiParams = '';
      let brandParams = '';
      apiParams = `?q=${this.search_input}`;
      // tslint:disable-next-line:max-line-length
      apiParams =
        this.published_value !== -1
          ? `${apiParams}&published_duration=${
              this.published_duration[this.published_value]['value']
            }`
          : apiParams;
      apiParams = this.by_author
        ? `${apiParams}&filter_by[]=author`
        : apiParams;
      apiParams = this.by_title ? `${apiParams}&filter_by[]=title` : apiParams;
      apiParams = this.by_desc
        ? `${apiParams}&filter_by[]=description`
        : apiParams;
      apiParams = this.by_keywords
        ? `${apiParams}&filter_by[]=keywords`
        : apiParams;
      apiParams = this.limit ? `${apiParams}&limit=${this.limit}` : apiParams;
      apiParams = this.offset
        ? `${apiParams}&offset=${this.offset}`
        : apiParams;
      // tslint:disable-next-line:max-line-length
      apiParams = this.isSpecificDate
        ? `${apiParams}&published_from_date=${params.published_from_date}&published_to_date=${params.published_to_date}`
        : apiParams;
      apiParams = `${apiParams}&brand_id=${this.brand_id}`;
      searchPopData['params'] = apiParams;
      brandParams = apiParams.replace(/brand_id/g, 'exclude_brand_id');
      brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
      brandParams = brandParams.replace(
        /offset=[0-9]*/g,
        `offset=${this.brandPeoples.length}`
      );

      const main_searchAPI = this.apiService.getAPI(`search${apiParams}`);
      const brand_searchAPI = this.apiService.getAPI(`search${brandParams}`);

      forkJoin(main_searchAPI, brand_searchAPI)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          if (results[0]['data'] === null) {
            searchPopData['recentPeoples'] = [];
          } else {
            searchPopData['recentPeoples'] = results[0]['data'];
          }
          if (results[1]['data'] === null) {
            searchPopData['brandPeoples'] = [];
          } else {
            searchPopData['brandPeoples'] = results[1]['data'];
          }
          searchPopData['has_more'] =
            results[0].has_more || results[1].has_more;
            this.recentPeoples = searchPopData['recentPeoples'];
            this.brandPeoples = searchPopData['brandPeoples'];
            this.params = searchPopData['params'];
            this.has_more = searchPopData['has_more'];
        });
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function (e) {
        setTimeout(() => {
          const size_li = 4;
          let x = 4;
          $('#myList li:lt(' + x + ')').show();
          $('#loadMore').click(function () {
            x = x + 1 <= size_li ? x + 1 : size_li;
            $('#myList li:lt(' + x + ')').show();
          });
        }, 2000);
      });
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  sort_search(key) {
    this.isSpecificDate = false;
    this.published_value = -1;
    if (key === this.sort_by) {
      return;
    } else {
      this.sort_by = key;
    }
    this.getDataByParams();
  }

  set_duration(key) {
    this.isSpecificDate = false;
    this.sort_by = -1;
    if (this.published_value === key) {
      this.published_value = -1;
    } else {
      this.published_value = key;
    }
    this.getDataByParams();
  }

  set_range() {
    this.isSpecificDate = true;
  }

  onChangeFilter(by_filter) {
    switch (by_filter) {
      case 'author':
        this.by_author = !this.by_author;
        break;
      case 'title':
        this.by_title = !this.by_title;
        break;
      case 'desc':
        this.by_desc = !this.by_desc;
        break;
      case 'keyword':
        this.by_keywords = !this.by_keywords;
        break;
      default:
        break;
    }
    this.getDataByParams();
  }

  updateSearchInput(input) {
    this.search_input = input;
    this.showSearchKey = input;
    this.getDataByParams();
  }

  getDataByParams() {
    this.params = `?q=${this.search_input}`;
    // tslint:disable-next-line:max-line-length
    this.params =
      this.published_value !== -1
        ? `${this.params}&published_duration=${
            this.published_duration[this.published_value]['value']
          }`
        : this.params;
    this.params = this.by_author
      ? `${this.params}&filter_by[]=author`
      : this.params;
    this.params = this.by_title
      ? `${this.params}&filter_by[]=title`
      : this.params;
    this.params = this.by_desc
      ? `${this.params}&filter_by[]=description`
      : this.params;
    this.params = this.by_keywords
      ? `${this.params}&filter_by[]=keywords`
      : this.params;
    this.params = this.limit
      ? `${this.params}&limit=${this.limit}`
      : this.params;
    this.params = `${this.params}&offset=0`;
    this.params = `${this.params}&brand_id=${this.brand_id}`;

    let brandParams = this.params.replace(/brand_id/g, 'exclude_brand_id');
    brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
    brandParams = brandParams.replace(
      /offset=[0-9]*/g,
      `offset=${this.brandPeoples.length}`
    );
    const main_searchAPI = this.apiService.getAPI(`search${this.params}`);
    const brand_searchAPI = this.apiService.getAPI(`search${brandParams}`);

    forkJoin(main_searchAPI, brand_searchAPI)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        if (results[0].data !== null) {
          this.offset = results[0]['data'].length;
          this.recentPeoples = results[0]['data'];
        } else {
          this.offset = 0;
          this.recentPeoples = [];
        }
        if (results[1].data === null) {
          this.brandPeoples = [];
        } else {
          this.brandPeoples = results[1]['data'];
        }
        this.has_more = results[0].has_more || results[1].has_more;
      });
    this.updateUrlState();
  }

  getMoreItems() {
    this.params = this.limit
      ? `${this.params}&limit=${this.limit}`
      : this.params;
    this.params = `${this.params}&offset=${this.recentPeoples.length}`;

    let brandParams = this.params.replace(/brand_id/g, 'exclude_brand_id');
    brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
    brandParams = brandParams.replace(
      /offset=[0-9]*/g,
      `offset=${this.brandPeoples.length}`
    );

    const main_searchAPI = this.apiService.getAPI(`search${this.params}`);
    const brand_searchAPI = this.apiService.getAPI(`search${brandParams}`);

    forkJoin(main_searchAPI, brand_searchAPI)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        if (results[0].data !== null) {
          this.offset += results[0]['data'].length;
          results[0]['data'].forEach((article) => {
            this.recentPeoples.push(article);
          });
          this.recentPeoples = JSON.parse(JSON.stringify(this.recentPeoples));
        } else {
          this.offset = 0;
          this.recentPeoples = [];
        }
        if (results[1].data === null) {
          this.brandPeoples = [];
        } else {
          results[1]['data'].forEach((article) => {
            this.brandPeoples.push(article);
          });
          this.brandPeoples = JSON.parse(JSON.stringify(this.brandPeoples));
        }
        this.has_more = results[0].has_more || results[1].has_more;
      });
  }

  onSearchSubmit(searchForm: FormGroup) {
    if (typeof this.dateSelected === 'undefined') {
      return;
    } else if (this.dateSelected.startDate === null) {
      return;
    } else {
      const start = moment(this.dateSelected.startDate).format('YYYY-MM-DD');
      const end = moment(this.dateSelected.endDate).format('YYYY-MM-DD');
      this.published_value = -1;

      this.params = `?q=${this.search_input}`;
      this.params = this.by_author
        ? `${this.params}&filter_by[]=author`
        : this.params;
      this.params = this.by_title
        ? `${this.params}&filter_by[]=title`
        : this.params;
      this.params = this.by_desc
        ? `${this.params}&filter_by[]=description`
        : this.params;
      this.params = this.by_keywords
        ? `${this.params}&filter_by[]=keywords`
        : this.params;
      this.params = this.limit
        ? `${this.params}&limit=${this.limit}`
        : this.params;
      this.params = `${this.params}&offset=0`;
      this.params = `${this.params}&published_from_date=${start}&published_to_date=${end}`;
      this.params = `${this.params}&brand_id=${this.brand_id}`;

      let brandParams = this.params.replace(/brand_id/g, 'exclude_brand_id');
      brandParams = brandParams.replace(/limit=[0-9]*/g, 'limit=2');
      brandParams = brandParams.replace(
        /offset=[0-9]*/g,
        `offset=${this.brandPeoples.length}`
      );
      const main_searchAPI = this.apiService.getAPI(`search${this.params}`);
      const brand_searchAPI = this.apiService.getAPI(`search${brandParams}`);

      forkJoin(main_searchAPI, brand_searchAPI)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((results) => {
          if (results[0].data !== null) {
            this.offset = results[0]['data'].length;
            this.recentPeoples = results[0]['data'];
          } else {
            this.offset = 0;
            this.recentPeoples = [];
          }
          if (results[1].data === null) {
            this.brandPeoples = [];
          } else {
            this.brandPeoples = results[1]['data'];
          }
          this.has_more = results[0].has_more || results[1].has_more;
        });
      this.updateUrlState(start, end);
    }
  }

  updateUrlState(startDate = '', endDate = '') {
    // tslint:disable-next-line:max-line-length
    let url = `searchpopup?search_input=${this.search_input}&brand_id=${this.brand_id}&by_author=${this.by_author}&by_title=${this.by_title}&by_desc=${this.by_desc}&by_keywords=${this.by_keywords}`;
    // tslint:disable-next-line:max-line-length
    url =
      this.published_value !== -1
        ? `${url}&published_duration=${this.published_value}`
        : `${url}&published_duration=`;
    // tslint:disable-next-line:max-line-length
    url = this.isSpecificDate
      ? `${url}&published_from_date=${startDate}&published_to_date=${endDate}`
      : `${url}&published_from_date=&published_to_date=`;
    this.location.replaceState(url);
  }

  hideSearchBar(status) {
    if (status === 'hidden') {
      this.hiddenSearchBar = true;
    } else {
      this.hiddenSearchBar = false;
    }
  }

  goReadMore(item) {
    if (typeof item !== 'undefined') {
      if (item.brand) {
        return `${item.brand.slug !== '1851' ? item.brand.slug + '/' : ''}${
          item.slug
        }#most-recent`;
      }
      return `${item.slug}#most-recent`;
    }
  }

  goReadMoreBrand(item) {
    if (typeof item !== 'undefined') {
      if (item.brand) {
        return `${item.brand.slug !== '1851' ? item.brand.slug + '/' : ''}${
          item.slug
        }#brand-latest-stories`;
      }
      return `${item.slug}#brand-latest-stories`;
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
