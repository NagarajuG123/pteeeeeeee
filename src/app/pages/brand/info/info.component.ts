import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
import { HttpClient } from '@angular/common/http';
import { MetaService } from 'src/app/_core/services/meta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  brandInfo: any = [];
  items: any;
  brandSlug: any;
  categories: any = [];
  validData = [];
  staticContent: any;
  pdf: any;
  selectedIndex: number = 0;
  inquireForm!: FormGroup;
  inquireFields: any = [];

  isStory: boolean = false;
  isInfo: boolean = false;
  isBought: boolean = false;
  isExecutive: boolean = false;
  isMarket: boolean = false;
  company!: string;
  geoJson: any;
  infoData: any;
  staticData: any;
  latestData: any;
  isEmailSubmit: boolean = false;
  emailSubMessage: string;
  emailSubValid: boolean = false;
  pdfForm: any;
  isBrowser: boolean = false;
  isCategory: boolean;
  isInfoPage: boolean;
  categoryParam = '';
  brandTrending: any;
  brandMostRecent: any;
  brandFeaturedUrl: any;
  mostRecent: any;
  submittedInquireForm: boolean = false;
  payLoad: any;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  hasMore: boolean = false;
  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private googleAnalyticsService: GoogleAnalyticsService,
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
    this.setInit();
  }
  setInit() {
    this.route.parent.params.subscribe((param) => {
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
              this.googleAnalyticsService.appendGaTrackingCode(
                response['ga']['1851_franchise'],
                response['ga']['tracking_code'],
                response['ga']['gtm_code'],
                response.slug
              );
            }
            let brandItems = [
              'info',
              'brand_pdf',
              'latest_stories',
              'why-i-bought',
              'executive',
              'available-markets',
            ];
            this.staticContent = [
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

    this.apiService
      .getAPI(`${this.brandSlug}/brand-pdf`)
      .subscribe((response) => {
        if (response.data != '') {
          this.pdf = response.data;
        }
      });
  }
  changeDownPDFUrl(url: any) {
    return url?.replace('api.', '');
  }
  isVideo(item: any) {
    return this.commonService.isVideo(item);
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
          this.toastr.success(result.data.message, 'Thanks!');
          this.submittedInquireForm = false;
          this.inquireForm.reset();
        } else {
          this.toastr.error(result.error.message, 'Error!');
        }
        this.submittedInquireForm = false;
      });
  }
  get formControlsValues() {
    return this.inquireForm.controls;
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
  getFormType(item) {
    let type = 'text';
    if (item === 'cust_field') {
      type = 'textarea';
    } else if (item === 'net_worth' || item === 'liquidity') {
      type = 'dropdown';
    }
    return type;
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  getMoreData() {
    this.apiService
      .getAPI(
        `${this.mostRecent}?limit=10&offset=${this.brandMostRecent.length}`
      )
      .subscribe((response) => {
        if (response.data != null) {
          this.hasMore = response.has_more;
          response.data.forEach((element: any) => {
            this.brandMostRecent.push(element);
          });
        }
      });
  }
  setParam(slug) {
    if (slug.includes('people')) {
      this.categoryParam = 'people';
    } else if (slug.includes('industry')) {
      this.categoryParam = 'industry';
    } else if (slug.includes('franchisee')) {
      this.categoryParam = 'franchisee';
    } else if (slug.includes('franchisor')) {
      this.categoryParam = 'franchisor';
    } else if (slug.includes('destinations')) {
      this.categoryParam = 'destinations';
    } else if (slug.includes('products')) {
      this.categoryParam = 'products';
    } else if (slug.includes('celebrities')) {
      this.categoryParam = 'celebrities';
    } else if (slug.includes('homes-to-own')) {
      this.categoryParam = 'homes-to-own';
    } else if (slug.includes('home-envy')) {
      this.categoryParam = 'home-envy';
    } else if (slug.includes('home-buzz')) {
      this.categoryParam = 'home-buzz';
    } else if (slug.includes('brand-news')) {
      this.categoryParam = 'brand-news';
    } else {
      this.categoryParam = 'columns';
    }
  }

  getContents(item: string | null) {
    let path;
    if (item === 'info') {
      path = 'brand-info';
      this.isInfo = true;
      this.selectedIndex = 0;
    } else if (item === 'latest_stories') {
      path = 'brand-latest-stories';
      this.isStory = true;
      this.selectedIndex = 2;
    } else if(item === 'why-i-bought') {
      path = 'brand-why-i-bought';
      this.isBought = true;
      this.selectedIndex = 3;
    } else if(item === 'executive') {
      path = 'brand-executive';
      this.isExecutive = true;
      this.selectedIndex = 4;
    } else if(item === 'available-markets') {
      path = 'brand-available-markets';
      this.isMarket = true;
      this.selectedIndex = 5; 
    }
    this.apiService
      .getAPI(`${this.brandSlug}/${path}`)
      .subscribe((response) => {
        this.items = response.data;
        let metaData = response.meta;
        this.metaService.setSeo(metaData);
        this.apiService
          .getAPI(`1851/publication-instance`)
          .subscribe((result) => {
            this.metaService.setTitle(
              `${metaData.seo.title} | ${result.title}`
            );
          });
      });
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
          window.open(this.pdf.media.url.replace('api.', ''), '_blank');
        } else {
          this.emailSubValid = true;
          this.emailSubMessage = res.message;
        }
      });
  }
  shareUrl() {
    return window.location.href;
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

  getBB(selection) {
    selection.each(function (d) {
      d.bbox = this.getBBox();
    });
  }
}
