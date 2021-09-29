import { Component, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Publication } from 'src/app/_core/models/publication.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import 'lazysizes';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.scss'],
})
export class BrandSearchComponent implements OnInit {
  bannerImage: string = '';
  publication: Publication = {};
  industryKeys: any = [];
  investKeys: any = [];
  items: any = [];
  industryValues: any = '';
  investValues: any = '';
  sortBrandValue = 'asc';

  hasMore: boolean = false;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    const params = `?q=&sort=brand&limit=10&offset=0`;
    const brandSearchData: any = [];
    const brandSearchApi = this.apiService.getAPI(`brand-search${params}`);
    const brandFilterApi = this.apiService.getAPI(`brand-filters`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    forkJoin([brandFilterApi, brandSearchApi, publication])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.publication = results[2];
        brandSearchData['industryKeys'] = [];
        brandSearchData['investKeys'] = [];
        results[0].data.industries.forEach(
          (industry: { name: any; id: any }) => {
            brandSearchData['industryKeys'].push({
              name: industry.name,
              value: industry.id,
              isChecked: false,
            });
          }
        );
        results[0].data['invesment-ranges'].forEach(
          (investment: { range_from: any; range_to: any }) => {
            brandSearchData['investKeys'].push({
              min: investment.range_from,
              max: investment.range_to,
              isChecked: false,
            });
          }
        );
        brandSearchData['items'] = results[1].data;
        brandSearchData['hasMore'] = results[1].has_more;

        this.industryKeys = brandSearchData['industryKeys'];
        this.investKeys = brandSearchData['investKeys'];
        this.items = brandSearchData['items'];
        this.hasMore = brandSearchData['hasMore'];
        const defaultTitle = `Franchise Opportunity Directory | Brand Search | ${this.publication?.title}`;

        this.metaService.setTitle(defaultTitle);
        this.setBannerImage();
      });
  }
  setBannerImage() {
    if (this.publication.id == '1851') {
      this.bannerImage = 'assets/img/banner_search_1851.png';
    } else if (this.publication.id == 'EE') {
      this.bannerImage = 'assets/img/banner_search_ee.jpg';
    } else {
      this.bannerImage = 'assets/img/banner_search_page_1903.jpg';
    }
  }
  getIndustry(industry: any[]) {
    var names = industry.map(function (item) {
      return item.name;
    });
    return names.join(', ');
  }
  selectAllIndustry() {
    this.industryValues = '';
    this.industryKeys.forEach((key: any) => {
      key['isChecked'] = true;
      this.industryValues += `&industries[]=${key['value']}`;
    });
    this.getSearchData();
  }
  clearAllIndustry() {
    this.industryValues = '';
    this.industryKeys.forEach((key: any) => {
      key['isChecked'] = false;
    });
    this.getSearchData();
  }
  onChangeIndustryFilter(index: any) {
    this.industryKeys[index]['isChecked'] =
      !this.industryKeys[index]['isChecked'];
    this.industryValues = '';
    this.industryKeys.forEach((key: any) => {
      if (key['isChecked']) {
        this.industryValues += `&industries[]=${key['value']}`;
      }
    });
    this.getSearchData();
  }
  selectAllInvestment() {
    this.investValues = '';
    this.investKeys.forEach((key: any) => {
      key['isChecked'] = true;
      this.investValues += `&investments[][from]=${key['min']}&investments[][to]=${key['max']}`;
    });
    this.getSearchData();
  }
  clearAllInvestment() {
    this.investValues = '';
    this.investKeys.forEach((key: any) => {
      key['isChecked'] = false;
    });
    this.getSearchData();
  }
  onChangeInvestmentFilter(index: any) {
    this.investKeys[index]['isChecked'] = !this.investKeys[index]['isChecked'];
    this.investValues = '';
    this.investKeys.forEach((key: any) => {
      if (key['isChecked']) {
        this.investValues += `&investments[][from]=${key['min']}&investments[][to]=${key['max']}`;
      }
    });
    this.getSearchData();
  }
  getSearchData() {
    const sortValue = `&sort=${
      this.sortBrandValue === 'asc' ? 'brand' : '-brand'
    }`;
    const params = `?q=${this.investValues}${this.industryValues}${sortValue}&limit=10&offset=0`;
    this.apiService.getAPI(`brand-search${params}`).subscribe((res) => {
      this.items = res['data'];
      this.hasMore = res['has_more'];
    });
  }
  getMoreData() {
    const sortValue = `&sort=${
      this.sortBrandValue === 'asc' ? 'brand' : '-brand'
    }`;
    const params = `?q=${this.investValues}${this.industryValues}${sortValue}&limit=10&offset=${this.items.length}`;
    this.apiService.getAPI(`brand-search${params}`).subscribe((res) => {
      res['data'].forEach((brand: any) => {
        this.items.push(brand);
      });
      this.hasMore = res['has_more'];
    });
  }
  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
