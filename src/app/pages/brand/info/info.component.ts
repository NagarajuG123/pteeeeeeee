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
import * as d3 from 'd3';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { Details } from 'src/app/_core/models/details.model';
import 'lazysizes';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
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
  tab: any;
  showToast: boolean = false;
  responseMessage: any;
  logo: string;
  featured: Details[] = [];
  trending: Details[] = [];

  isStory!: boolean;
  isPdf!: boolean;
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
  isEmailSubmit: boolean = false;
  emailSubMessage: string;
  emailSubValid: boolean = false;
  isSubmitFailed: boolean = false;
  submittedInquireForm: boolean = false;
  submitErrMsg: string = '';
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  hasMore: boolean = false;
  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private metaService: MetaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) platformId: Object,
    private httpClient: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.pdfForm = fb.group({
      emailInput: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
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
            if (this.brandSlug !== '1851' && this.isBrowser && response['ga']) {
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
            if (brandItems.includes(params.get('item'))) {
              this.company = response.name;
              this.apiService
                .getAPI(`${this.brandSlug}/brand-view`)
                .subscribe((response) => {
                  this.brandInfo = response.data;
                });

              const featuredApi = this.apiService.getAPI(
                `${this.brandSlug}/featured-articles?limit=6&offset=0`
              );
              const trendingApi = this.apiService.getAPI(
                `${this.brandSlug}/trending?limit=4&offset=0`
              );
              forkJoin([featuredApi, trendingApi])
                .pipe(takeUntil(this.onDestroy$))
                .subscribe((response) => {
                  this.featured = response[0].data;
                  this.trending = response[1].data;
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
  changeDownPDFUrl(url: any) {
    return url?.replace('api.', '');
  }
  submitInquireForm(values: any) {
    this.submittedInquireForm = true;
    if (this.inquireForm.invalid) {
      return;
    }
    this.apiService
      .postAPI(`${this.brandSlug}/brand-inquire`, values)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
        $('#inquireModalClose').click();
        $('#thanksModal').show();
        setTimeout(() => {
          $('#thanksModal').hide();
        },10000);
        this.inquireForm.reset();
      } else {
        this.submitErrMsg = result.error.message;
        this.isSubmitFailed = true;
      }
        this.submittedInquireForm = false;
      });
  }
  get formControlsValues() {
    return this.inquireForm.controls;
  }
  emailSubscribe(pdfform: FormGroup) {
    this.isEmailSubmit = true;
    this.emailSubMessage = '';
    if (!pdfform.valid) {
      return;
    }
    const payload = {
      email: pdfform.controls['emailInput'].value,
    };
    this.apiService
      .postAPI(`${this.brandSlug}/brand-pdf`, payload)
      .subscribe((res) => {
        $('#pdfModal').hide();
        if (res.success) {
          window.open(this.items.media.url.replace('api.', ''), '_blank');
        } else {
          this.emailSubValid = true;
          this.emailSubMessage = res.message;
        }
      });
  }
  getContents(item: string | null) {
    let path;
    if (item === 'info') {
      path = 'brand-info';
      this.isInfo = true;
      this.isStory =
        this.isBought =
        this.isExecutive =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'brand_pdf') {
      path = 'brand-pdf';
      this.isPdf = true;
      this.isInfo =
        this.isBought =
        this.isExecutive =
        this.isMarket =
        this.isStory =
          false;
    } else if (item === 'latest_stories') {
      path = 'brand-latest-stories';
      this.isStory = true;
      this.isInfo =
        this.isBought =
        this.isExecutive =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'why-i-bought') {
      path = 'brand-why-i-bought';
      this.isBought = true;
      this.isInfo =
        this.isStory =
        this.isExecutive =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'executive') {
      path = 'brand-executive';
      this.isExecutive = true;
      this.isInfo =
        this.isBought =
        this.isStory =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'available-markets') {
      path = 'brand-available-markets';
      this.isMarket = true;
      this.isInfo =
        this.isBought =
        this.isExecutive =
        this.isStory =
        this.isPdf =
          false;
    }
    const itemApi = this.apiService.getAPI(`${this.brandSlug}/${path}`);
    const publicationApi = this.apiService.getAPI(`1851/publication-instance`);
    const headerApi = this.apiService.getAPI2(`header?slug=${this.brandSlug}`);
    forkJoin([itemApi, publicationApi, headerApi]).subscribe((results) => {
      this.items = results[0].data;
      this.logo = results[2].data.logo.image;
      if (results[0].meta) {
        this.metaService.setSeo(results[0].meta);
        this.metaService.setTitle(
          `${results[0].meta.seo.title} | ${results[1].title}`
        );
      }
      if (item === 'available-markets') {
        const vm = this;
        this.httpClient
          .get('../../../assets/us-states.json')
          .subscribe((json: any) => {
            this.geoJson = json;
            vm.drawMap(this.items);
            window.onresize = function () {};
          });
      }
    });
  }
  setParam(categorySlug: string | null) {}
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
              required: response.schema.required.find((v) => v === item)
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
          this.inquireFields.forEach((item, index) => {
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
  closeModal(id) {
    $(`#${id}`).hide();
  }
  getFormType(item: any) {
    let type = 'text';
    if (item === 'cust_field') {
      type = 'textarea';
    } else if (item === 'net_worth' || item === 'liquidity') {
      type = 'dropdown';
    }
    return type;
  }
  setActiveTab(val, item) {
    this.activeTab = val;
    this.tab = item?.value;
    this.getContents(this.tab);
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
  marketingColor(state, items) {
    if (items['available-markets'] === null) {
      return '#bcb29a';
    }
    for (let n = 0; n < items['available-markets'].length; n++) {
      for (let i = 0; i < items['available-markets'][n].countries.length; i++) {
        if (
          state.properties.abbr ===
          items['available-markets'][n].countries[i].iso2_code
        ) {
          return items['available-markets'][n].color;
        }
      }
    }
    return '#bcb29a';
  }
  drawMap(items) {
    const isMobile = window.outerWidth < 600 ? true : false;
    const vm = this;
    let gadget_projection,
      gadget_path,
      gadget_svg,
      gadget_g,
      gadget_states,
      gadget_labels;
    gadget_projection = d3
      .geoAlbersUsa()
      .scale(isMobile ? 400 : 1000)
      .translate([0, 0]);
    gadget_path = d3.geoPath().projection(gadget_projection);
    gadget_svg = d3.selectAll('#map');
    if (isMobile) {
      gadget_svg.attr('width', 345).attr('height', 300);
    }
    gadget_g = gadget_svg
      .append('g')
      .attr(
        'transform',
        isMobile ? 'translate(150, 130)' : 'translate(370, 230)'
      )
      .append('g')
      .attr('class', 'states');
    gadget_states = gadget_g
      .selectAll('path')
      .data(this.geoJson.features)
      .enter()
      .append('path')
      .attr('d', gadget_path)
      .style('stroke', '#000')
      .style('stroke-width', '1')
      .attr('name', function (d) {
        return 'path-' + d.properties.abbr;
      })
      .style('fill', function (d) {
        return vm.marketingColor(d, items);
      });
    gadget_g
      .selectAll('rect')
      .data(this.geoJson.features)
      .enter()
      .filter(function (d) {
        if (
          !isMobile &&
          (d.properties.abbr === 'MA' ||
            d.properties.abbr === 'RI' ||
            d.properties.abbr === 'NJ' ||
            d.properties.abbr === 'CT' ||
            d.properties.abbr === 'HI' ||
            d.properties.abbr === 'NJ' ||
            d.properties.abbr === 'DE' ||
            d.properties.abbr === 'MD' ||
            d.properties.abbr === 'DC' ||
            d.properties.abbr === 'VT' ||
            d.properties.abbr === 'NH')
        ) {
          return true;
        }
        return false;
      })
      .append('rect')
      .attr('transform', function (d) {
        if (!isMobile && d.properties.abbr === 'HI') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] + 30) +
            ',' +
            gadget_path.centroid(d)[1] +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'VT') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 40) +
            ',' +
            (gadget_path.centroid(d)[1] - 40) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NH') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 40) +
            ',' +
            (gadget_path.centroid(d)[1] - 70) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MA') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] - 30) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'RI') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] - 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'CT') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 5) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DE') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 27) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MD') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            gadget_path.centroid(d)[1] +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DC') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 45) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NJ') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 1) +
            ')'
          );
        }
        return (
          'translate(' +
          gadget_path.centroid(d)[0] +
          ',' +
          (gadget_path.centroid(d)[1] - 15) +
          ')'
        );
      })
      .attr('width', function (d) {
        return 30;
      })
      .attr('height', function (d) {
        return 20;
      })
      .attr('stroke', '#000000')
      .attr('stroke-width', '2')
      .style('fill', function (d) {
        return vm.marketingColor(d, items);
      });
    gadget_labels = gadget_g
      .selectAll('text')
      .data(this.geoJson.features)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('stroke', '#f2f2f2')
      .attr('font-size', '12px')
      .attr('transform', function (d) {
        if (!isMobile && d.properties.abbr === 'HI') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] + 40) +
            ',' +
            (gadget_path.centroid(d)[1] + 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'VT') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 32) +
            ',' +
            (gadget_path.centroid(d)[1] - 25) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NH') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 32) +
            ',' +
            (gadget_path.centroid(d)[1] - 55) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MA') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] - 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'RI') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            gadget_path.centroid(d)[1] +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'CT') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 20) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DE') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 42) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MD') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DC') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 60) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NJ') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 16) +
            ')'
          );
        }
        return 'translate(' + gadget_path.centroid(d) + ')';
      })
      .text(function (d) {
        return d.properties.abbr;
      })
      .call(this.getBB);
  }
  getBB(selection: any) {
    selection.each((d) => {});
  }
}
