import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
import { HttpClient } from '@angular/common/http';
import { MetaService } from 'src/app/_core/services/meta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { isPlatformBrowser } from '@angular/common';

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
  inquireForm: any;
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
  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
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
    this.route.paramMap.subscribe((params) => {
      this.brandSlug = params.get('brandSlug');
      this.apiService
        .getAPI(`get-brand-by-slug/${this.brandSlug}`)
        .subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.company = response.name;
            this.apiService
              .getAPI(`${this.brandSlug}/brand-view`)
              .subscribe((response) => {
                this.brandInfo = response.data;
              });
            this.setTab();
            this.getContents(params.get('item'));
          }
        });
    });
    this.categories = [
      { name: 'BRAND INFO', value: 'info' },
      { name: 'DOWNLOAD BRAND PDF', value: 'brand_pdf' },
      { name: 'LATEST STORIES', value: 'latest_stories' },
      { name: 'Why I BOUGHT', value: 'why-i-bought' },
      { name: 'EXECUTIVE Q&A', value: 'executive' },
      { name: 'AVAILABLE MARKETS', value: 'available-markets' },
    ];
    this.staticContent = ['why-i-bought', 'executive', 'available-markets'];
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
  getInquiry() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand/inquire`)
      .subscribe((response) => {
        this.inquireForm = response.schema;
      });
  }

  setTab() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand-info`)
      .subscribe(async (response) => {
        let info = response.data.length > 0 ? true : false;
        this.validData.push(info);
        let pdf = this.pdf != '' ? true : false;
        this.validData.push(pdf);
        this.apiService
          .getAPI(`${this.brandSlug}/brand-latest-stories`)
          .subscribe(async (response) => {
            let latest = response.data.length > 0 ? true : false;
            this.validData.push(latest);
            this.apiService
              .getAPI(`${this.brandSlug}/brand-static-content`)
              .subscribe(async (response) => {
                let bought = response.data.find(
                  (o: any) => o.slug === 'why-i-bought'
                )
                  ? true
                  : false;

                this.validData.push(bought);
                let qa = response.data.find((o: any) => o.slug === 'executive')
                  ? true
                  : false;
                this.validData.push(qa);
                let market = response.data.find(
                  (o: any) => o.slug === 'available-markets'
                )
                  ? true
                  : false;
                this.validData.push(market);
              });
          });
      });
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
    } else if (this.staticContent.includes(item)) {
      path = 'brand-static-content';
    }
    this.apiService
      .getAPI(`${this.brandSlug}/${path}`)
      .subscribe((response) => {
        this.items = response;
        this.metaService.setSeo(response.meta);
        if (
          item === 'why-i-bought' &&
          this.items.data.find((o: any) => o.slug === 'why-i-bought')
        ) {
          this.items = this.items.data.find(
            (o: any) => o.slug === 'why-i-bought'
          );
          this.isBought = true;
          this.selectedIndex = 3;
        } else if (
          item === 'executive' &&
          this.items.data.find((o: any) => o.slug === 'executive')
        ) {
          this.items = this.items.data.find((o: any) => o.slug === 'executive');
          this.isExecutive = true;
          this.selectedIndex = 4;
        } else if (
          item === 'available-markets' &&
          this.items.data.find((o: any) => o.slug === 'available-markets')
        ) {
          this.items = this.items.data.find(
            (o: any) => o.slug === 'available-markets'
          );
          this.isMarket = true;
          this.selectedIndex = 5;
        }
      });
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
}
