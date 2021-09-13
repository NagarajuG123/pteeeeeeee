import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ValidationService } from 'src/app/_core/services/validation.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  categories: any = [];
  brandSlug!: string;
  noOfTabsShow = 5;
  activeTab = 1;
  skipTab = 0;
  inquireForm!: FormGroup;
  inquireFields: any = [];
  isBrowser: boolean = false;
  pdfForm: any;
  brandInfo: any = [];
  items: any;
  
  isStory!: boolean;
  isInfo!: boolean;
  isBought!: boolean;
  isExecutive!: boolean;
  isMarket!: boolean;
  geoJson: any;
  infoData: any;
  staticData: any;
  latestData: any;
  company!: string;
  isCategory!: boolean;
  isInfoPage!: boolean;
  mostRecent: any;
  brandTrending: any;
  brandMostRecent: any;
  brandFeaturedUrl: any;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  hasMore: boolean = false
  constructor(public commonService: CommonService,
    private apiService: ApiService,
    private metaService:MetaService,
    private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object,
    private httpClient: HttpClient) { 
      this.isBrowser = isPlatformBrowser(platformId);

      this.pdfForm = fb.group({
        emailInput: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
      });

    }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.brandSlug = param.slug;
    });
    this.route.paramMap.subscribe((params) => {
      this.apiService
        .getAPI(`get-brand-by-slug/${this.brandSlug}`)
        .subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            if (this.brandSlug !== '1851' && response['ga']) {
                response.slug;
            }
            let brandItems = [
              'info',
              'brand_pdf',
              'latest_stories',
              'why-i-bought',
              'executive',
              'available-markets',
            ];

            this.apiService
              .getAPI(`${this.brandSlug}/info-tab`)
              .subscribe((result) => {
                this.categories = result.categories;
              });
            if (brandItems) {
              this.company = response.name;
              this.apiService
                .getAPI(`${this.brandSlug}/brand-view`)
                .subscribe((response) => {
                  this.brandInfo = response.data;
                });
              this.isInfoPage = true;
              this.isCategory = false;
              this.getContents(params.get('item'));
              this.getInquiry();
            } else {
              const categorySlug = params.get('item');
              this.isCategory = true;
              this.isInfoPage = false;
              this.brandFeaturedUrl = `${this.brandSlug}/${categorySlug}/featured`;
              const mostRecent = this.apiService.getAPI(
                `${this.brandSlug}/${categorySlug}/most-recent`
              );
              this.mostRecent = `${this.brandSlug}/${categorySlug}/most-recent`;
              const trending = this.apiService.getAPI(
                `${this.brandSlug}/${categorySlug}/trending?limit=10&offset=0`
              );
              const meta = this.apiService.getAPI(`1851/${categorySlug}/meta`);

              this.setParam(categorySlug);
              forkJoin([mostRecent, trending, meta])
                .pipe(takeUntil(this.onDestroy$))
                .subscribe((results) => {
                  if (results[0].data[0] != null) {
                    this.brandMostRecent = results[0].data;
                  }
                  this.brandTrending = results[1];
                  this.hasMore = results[0]['has_more'];
                  if (results[2] != null) {
                    this.metaService.setSeo(results[2].data);
                  }
                });
            }
          }
        });
    });
  }
  getContents(item: string | null) {
    let path;
    if (item === 'info') {
      path = 'brand-info';
      this.isInfo = true;
      this.isStory = this.isBought = this.isExecutive = this.isMarket = false;
    } else if (item === 'latest_stories') {
      path = 'brand-latest-stories';
      this.isStory = true;
      this.isInfo = this.isBought = this.isExecutive = this.isMarket = false;
    } else if (item === 'why-i-bought') {
      path = 'brand-why-i-bought';
      this.isBought = true;
      this.isInfo = this.isStory = this.isExecutive = this.isMarket = false;
    } else if (item === 'executive') {
      path = 'brand-executive';
      this.isExecutive = true;
      this.isInfo = this.isBought = this.isStory = this.isMarket = false;
    } else if (item === 'available-markets') {
      path = 'brand-available-markets';
      this.isMarket = true;
      this.isInfo = this.isBought = this.isExecutive = this.isStory = false;
    }
    const itemApi = this.apiService.getAPI(`${this.brandSlug}/${path}`);
    const publicationApi = this.apiService.getAPI(`1851/publication-instance`);
    forkJoin([itemApi, publicationApi]).subscribe((results) => {
      this.items = results[0].data;
      let metaData = results[0].meta;
      this.metaService.setSeo(metaData);
      this.metaService.setTitle(`${metaData.seo.title} | ${results[1].title}`);
      if (item === 'available-markets') {
        const vm = this;
        this.httpClient
          .get('../../../assets/us-states.json')
          .subscribe((json: any) => {
            this.geoJson = json;
            // vm.drawMap(this.items);
            window.onresize = function () {};
          });
      }
    });
  }
  setParam(categorySlug: string | null) {
    throw new Error('Method not implemented.');
  }

  getInquiry() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand/inquire`)
      .subscribe((response) => {
        if (response.schema) {
          const group: any = {};
          let objectKey = Object.keys(response.schema.properties);
          this.inquireFields = objectKey.map((item, index) => {
            let value: any = {
              value: '',
              key: item,
              title: response.schema.properties[item].title,
              required: response.schema.required.find((v:any) => v === item)
                ? true
                : false,
              type: this.getFormType(item),
              pattern: response.schema.properties[item].pattern || '',
              enum: response.schema.properties[item].enum || '',
              errorMsg:
                response.schema.properties[item].validationMessage ||
                (
                  response.schema.properties[item].title + ' field required.'
                ).toLocaleLowerCase(),
            };
            if (response.schema.properties[item].maxLength) {
              value.maxLength = response.schema.properties[item].maxLength;
            }
            return value;
          });
          this.inquireFields.forEach((item:any, index:number) => {
            let validation = [];
            if (item.required) {
              validation.push(Validators.required);
            }
            if (item.maxLength) {
              validation.push(Validators.maxLength(item.maxLength));
            }
            if (item.key === 'email') {
              validation.push(Validators.email);
            }
            if (item.pattern) {
              validation.push(Validators.pattern(item.pattern));
            }
            group[item.key] = [item.value || '', [...validation]];
          });
          this.inquireForm = this.fb.group(group);
        }
      });
  }

  getFormType(item:any) {
    let type = 'text';
    if (item === 'cust_field') {
      type = 'textarea';
    } else if (item === 'net_worth' || item === 'liquidity') {
      type = 'dropdown';
    }
    return type;
  }

  setActiveTab(val: any) {
    this.activeTab = val;
  }
  prev() {
    if (this.skipTab > 0) {
      this.skipTab -= 1;
    } else this.skipTab = 0;
  }
  next() {
    if (this.skipTab < this.categories.length - this.commonService.vtabsItem) {
      this.skipTab += 1;
    }
  }
}

