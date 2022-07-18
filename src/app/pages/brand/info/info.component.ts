import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
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
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  categories: any = [];
  brandSlug!: string;
  activeTab = 1;
  skipTab = 0;
  inquireForm!: FormGroup;
  inquireFields: any = [];
  isBrowser: boolean = false;
  pdfForm: any;
  brandInfo: any = [];
  items: any;
  story: any;
  tab: any;
  logo: string;
  featured: Details[] = [];
  trending: Details[] = [];
  s3Url = environment.s3Url;
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
  isEmailSubmit: boolean = false;
  emailSubMessage: string;
  emailSubValid: boolean = false;
  isSubmitFailed: boolean = false;
  submittedInquireForm: boolean = false;
  submitErrMsg: string = '';
  openVideoPlayer: boolean;
  brandVideoUrl: string;
  isSubmitted: boolean = false;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  hasMore: boolean = false;
  categorySlug: string;
  tabClass:string;
  page= 1;

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private metaService: MetaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
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
        .getAPI2(`${this.brandSlug}`)
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
            if(this.isBrowser) {
              const isMobile = window.outerWidth < 600 ? true : false;

              if(isMobile) {
              this.skipTab = this.activeTab - 1;
              }
            }
            this.apiService
              .getAPI2(`${this.brandSlug}/info-tab`)
              .subscribe((result) => {
                this.categories = result.categories;
                this.tabClass = `row-cols-lg-${this.categories.length}`;
                this.activeTab =
                  this.categories
                    .map(function (e) {
                      return e.value;
                    })
                    .indexOf(params.get('item')) + 1;
              });
             
            if (brandItems.includes(params.get('item'))) {
              this.company = response.name;
              this.apiService
                .getAPI2(`financial?slug=${this.brandSlug}`)
                .subscribe((response) => {
                  this.brandInfo = response.data;
                  if (this.isVideo(response.data)) {
                    this.brandVideoUrl = response.data.media.url;
                  }
                });
                const featuredApi = this.apiService.getAPI2(
                  `articles/featured?limit=7&page=1&slug=${this.brandSlug}`)
              const trendingApi = this.apiService.getAPI2(
                `articles/trending?limit=4&page=1&slug=${this.brandSlug}`
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
              this.categorySlug = params.get('item');
              this.isCategory = true;
              this.isInfoPage = false;
            }
          }
        });
    });
  }
  isVideo(item: { media: { type: string } | null } | null) {
    if (typeof item !== 'undefined' && item !== null) {
      if (typeof item.media !== 'undefined' && item.media !== null) {
        if (item.media.type === 'video') {
          return true;
        }
      }
    }
    return false;
  }
  changeDownPDFUrl(url: any) {
    return url?.replace('api.', '');
  }
  submitInquireForm(values: any) {
    this.isSubmitted = true;
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
          }, 10000);
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
        $('body').removeClass('modal-open');
        $('body').removeAttr('style');
        $('.modal-backdrop').remove();
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
      path = 'info';
      this.isInfo = true;
      this.isStory =
        this.isBought =
        this.isExecutive =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'brand_pdf') {
      path = 'pdf';
      this.isPdf = true;
      this.isInfo =
        this.isBought =
        this.isExecutive =
        this.isMarket =
        this.isStory =
          false;
    } else if (item === 'latest_stories') {
      path = 'latest-stories?limit=20';
      this.isStory = true;
      this.isInfo =
        this.isBought =
        this.isExecutive =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'why-i-bought') {
      path = 'why-i-bought';
      this.isBought = true;
      this.isInfo =
        this.isStory =
        this.isExecutive =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'executive') {
      path = 'executive';
      this.isExecutive = true;
      this.isInfo =
        this.isBought =
        this.isStory =
        this.isMarket =
        this.isPdf =
          false;
    } else if (item === 'available-markets') {
      path = 'available-market';
      this.isMarket = true;
      this.isInfo =
        this.isBought =
        this.isExecutive =
        this.isStory =
        this.isPdf =
          false;
    }
    const latestStories =  this.apiService.getAPI2(`articles/latest-stories?limit=20&page=${this.page}&slug=${this.brandSlug}`);
    const itemApi = this.apiService.getAPI2(`${path}?slug=${this.brandSlug}`);
    const headerApi = this.apiService.getAPI2(`header?slug=${this.brandSlug}`);
    forkJoin([itemApi, headerApi,latestStories]).subscribe((results) => {
      this.items = results[0].data;
      this.story = results[2].data;
      this.hasMore = results[0].has_more;
      this.logo = results[1].data.logo.image;
      if (results[0].meta) {
        this.metaService.setSeo(results[0].meta);
        this.metaService.setTitle(
          `${results[0].meta.seo.title} | ${this.commonService.publication.title}`
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
  getMore() {
    this.apiService
      .getAPI(
        `articles/latest-stories?slug=${this.brandSlug}&limit=5&page=${this.page + 4}`
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result.data.length) {
          result['data'].forEach((item: any) => {
            this.items.push(item);
          });
          this.hasMore = result.hasMore;
          this.page++;
        }
      });
  }
  getInquiry() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand/inquire`)
      .subscribe((response) => {
        if (response.schema) {
          const group: any = {};
          let objectKey = Object.keys(response.schema.properties);
          this.inquireFields = objectKey.map((item) => {
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
          this.inquireFields.forEach((item) => {
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
  showFinance(brandInfo) {
    return brandInfo?.units || brandInfo?.expected_to_open || brandInfo?.startup_costs || brandInfo?.franchise_fee || brandInfo?.royalty || brandInfo?.startup_costs || brandInfo?.optional_info &&  brandInfo?.optional_info.length > 0;
  }
  prev() {
    if (this.skipTab > 0) {
      this.skipTab -= 1;

      this.activeTab -= 1;
      this.setActiveTab(this.activeTab, this.categories[this.activeTab - 1]);
    } else this.skipTab = 0;
  }
  next() {
    if (
      this.skipTab <
      this.categories.length - this.commonService.brandInfoTabs
    ) {
      this.skipTab += 1;
      this.activeTab += 1;
      this.setActiveTab(this.activeTab, this.categories[this.activeTab - 1]);
    }
  }
  prevMobile() {
    this.activeTab -= 1;
    if(this.activeTab > 0){
      this.setActiveTab(this.activeTab, this.categories[this.activeTab - 1]);
    }
  }
  nextMobile() {
    this.activeTab += 1;
    if(this.activeTab <= this.categories.length){
      this.setActiveTab(this.activeTab, this.categories[this.activeTab - 1]);
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.commonService.resizeBrandInfo(event.target.innerWidth);
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
      .attr('width', function () {
        return 30;
      })
      .attr('height', function () {
        return 20;
      })
      .attr('stroke', '#000000')
      .attr('stroke-width', '2')
      .style('fill', function (d:any) {
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
      .attr('transform', function (d:any) {
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
    selection.each(() => {});
  }
  ngAfterViewInit(){
    if(this.isBrowser)
    {
      $('.modal').on('hidden.bs.modal', function(){
        $('.modal').hide();
        const modalVideo = $(this).html();
        $(this).html(modalVideo);
      });
    }
  }
}
