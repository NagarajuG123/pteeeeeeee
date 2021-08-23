import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from '../../_core/services/common.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchCloseBtn') searchCloseBtn;

  header: any = [];
  brandSlug:string;
  brandTitle!: string;
  isMain: boolean;
  isShow: boolean;
  publication: any;
  type: any;
  isBrowser!: boolean;
  news: any;
  resultData: any;
  editorialEmail: string;
  searchForm: FormGroup;
  subject: Subject<any> = new Subject();
  scrollbarOptions: any;
  brandId: string = '1851';
  isSubmitted: boolean = false;
  isSubmitFailed: boolean = false;
  submittedInquireForm: boolean = false;
  inquireForm!: FormGroup;
  inquireFields: any = [];
  isInquire: boolean = false;
  inquireTitle = '';
  inquireData: any;
  submitErrMsg: string = '';
  isSide: boolean;
  sidenav: any;
  ga: any;
  isFranchiseMenu: boolean = false;
  isLearnMenu: boolean = false;
  isBrandLearnMenu: boolean = false;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  pdfForm: any;
  isEmailSubmit: boolean = false;
  emailSubMessage: string;
  emailSubValid: boolean = false;
  isContact: boolean = false;
  contactTitle = '';
  contactFields: any;
  contactForm!: FormGroup;
  submittedContactForm: boolean = false;
  downloadPdfUrl: any;
  isPdfEmail: any = false;
  visitSite: any;
  defaultBrandLogo: string;
  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private fb: FormBuilder,
    private _googleAnalyticsService: GoogleAnalyticsService,
    @Inject(DOCUMENT) private _document: HTMLDocument
  ) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
    this.pdfForm = fb.group({
      emailInput: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
        ]),
      ],
    });
    this.isBrowser = isPlatformBrowser(platformId);
    this.defaultBrandLogo = 'EE-logo-mark-01.svg';
  }

  ngOnInit(): void {
    this.isShow = true;
    this.isSide = false;
    this.isMain = false;
    this.setSlug();
    this.subject.subscribe(() => {
      this.apiService
        .getAPI(
          `search?q=${this.searchForm.controls['searchInput'].value}&filter_by[]=author&filter_by[]=title&filter_by[]=description&filter_by[]=keywords&limit=10&sort_by=newest&brand_id=${this.brandId}`
        )
        .subscribe((res) => {
          this.news = res.data;
        });
    });
  }

  setSlug() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === 'robots.txt') {
          this.isShow = false;
        } else if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.isMain = true;
          this.setInit();
        } else {
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
            .subscribe((response) => {
              if (response.status != 404 && response.type === 'brand_page') {
                this.brandTitle = response.name;
                this.brandSlug = response.slug;
                this.brandId = response.id;
                this.ga = response.ga;
                this.isMain = false;
              } else {
                this.brandSlug = '1851';
                this.brandId = '1851';
                this.isMain = true;
              }
              this.setInit();
            });
        }
      }
    });
    this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
  }
  setInit() {
    const header = this.apiService.getAPI(`${this.brandSlug}/header`);
    const news = this.apiService.getAPI(`${this.brandSlug}/news`);
    const inquire = this.apiService.getAPI(`${this.brandSlug}/brand/inquire`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    const sidenav = this.apiService.getAPI(`${this.brandSlug}/sidebar`);
    
    forkJoin([header, news, inquire, publication, sidenav]).subscribe(
      (results) => {
        this.header = results[0].data;
        this.news = results[1].data;
        this.inquireData = results[2].schema;
        this.publication = results[3];
        this.sidenav = results[4].data;
        this.isSide = true;
        this.setFavicon();
        
        if (this.brandSlug != '1851') {
          this.getInquiry();
          this.getContact();
          if (this.sidenav[this.brandSlug]) {
            this.downloadPdfUrl = `${
              this.sidenav[this.brandSlug]['download-pdf']['url']
            }`;
            this.isPdfEmail = `${
              this.sidenav[this.brandSlug]['download-pdf']['email_popup']
            }`;
            this.visitSite = `${
              this.sidenav[this.brandSlug]['visit-website']['url']
            }`;
          }
          this.setEditorialEmail();
        }
      }
    );
  }
  setEditorialEmail() {
    if (this.publication.id === '1851') {
      this.editorialEmail = 'editorial@1851franchise.com';
    } else if (this.publication.id.toLowerCase() === 'ee') {
      this.editorialEmail = 'editorial@estatenvy.com';
    } else {
      this.editorialEmail = 'editorial@room1903.com';
    }
  }
  visitBrandPage() {
    const action = this.visitSite
      .replace(/^https?:\/\//, '')
      .replace(/^http?:\/\//, '')
      .match(/^([^\/]+)/gm)[0];
    this._googleAnalyticsService.appendGaEventOutboundLink(
      this.ga['1851_franchise'],
      this.brandId,
      action,
      'Visit Website',
      this.brandTitle
    );
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  onSearchSubmit(searchForm: FormGroup, type) {
    if (type === 'sidebar') {
      this.commonService.toggle();
    }

    this.searchCloseBtn.nativeElement.click();

    if (this.brandId === '1851') {
      window.location.href = `/searchpopup?search_input=${
        searchForm.controls['searchInput'].value
      }&brand_id=${this.publication.id.toLowerCase()}`;
    } else {
      window.location.href = `/${this.brandSlug}/searchpopup?search_input=${searchForm.controls['searchInput'].value}&brand_id=${this.brandId}`;
    }
    this.searchForm.controls['searchInput'].setValue('');
  }

  onKeyUp(): void {
    this.subject.next();
  }
  submitInquireForm(values: any) {
    this.submittedInquireForm = true;
    this.isSubmitted = true;
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
  get formControlsContactValues() {
    return this.contactForm.controls;
  }
  getInquiry() {
    if (this.inquireData != null) {
      this.isInquire = true;
      this.inquireTitle = this.inquireData.title;
      const group: any = {};
      let objectKey = Object.keys(this.inquireData.properties);
      this.inquireFields = objectKey.map((item, index) => {
        let value: any = {
          value: '',
          key: item,
          title: this.inquireData.properties[item].title,
          required: this.inquireData.required.find((v) => v === item)
            ? true
            : false,
          type: this.getFormType(item),
          pattern: this.inquireData.properties[item].pattern || '',
          enum: this.inquireData.properties[item].enum || '',

          errorMsg:
            this.inquireData.properties[item].validationMessage ||
            (
              this.inquireData.properties[item].title + ' field required.'
            ).toLocaleLowerCase(),
        };
        if (this.inquireData.properties[item].maxLength) {
          value.maxLength = this.inquireData.properties[item].maxLength;
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
  }
  closeModal(id) {
    $(`#${id}`).hide();
  }
  getFormType(item) {
    let type = 'text';
    if (item === 'net_worth' || item === 'liquidity') {
      type = 'dropdown';
    }
    return type;
  }
  getContact() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand/contact`)
      .subscribe((response) => {
        if (response.schema != null) {
          this.isContact = true;
          this.contactTitle = response.schema.title;
          const group: any = {};
          let objectKey = Object.keys(response.schema.properties);
          this.contactFields = objectKey.map((item, index) => {
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
          this.contactFields.forEach((item, index) => {
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
          this.contactForm = this.fb.group(group);
        }
      });
  }
  submitContactForm(values: any) {
    this.submittedContactForm = true;
    this.isSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }
    this.apiService
      .postAPI(`${this.brandSlug}/brand/contact`, values)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
          $('#contactModalClose').click();
          $('#thanksModal').show();
          setTimeout(() => {
            $('#thanksModal').hide();
          }, 10000);
        } else {
          this.submitErrMsg = result.error.message;
          this.isSubmitFailed = true;
        }
        this.submittedContactForm = false;
      });
  }

  toggleFranchise() {
    this.isFranchiseMenu = !this.isFranchiseMenu;
  }
  toggleLearn() {
    this.isLearnMenu = !this.isLearnMenu;
  }
  toggleBrandLearn() {
    this.isBrandLearnMenu = !this.isLearnMenu;
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
        $('#pdfModal1').hide();
        if (res.success) {
          window.open(this.downloadPdfUrl.replace('api.', ''), '_blank');
        } else {
          this.emailSubValid = true;
          this.emailSubMessage = res.message;
        }
      });
  }
  setFavicon() {
    let favicon;
    if (this.publication.id == 'EE') {
      favicon = 'ee';
    } else if (this.publication.id == '1851') {
      favicon = '1851';
    } else {
      favicon = '1903';
    }
    this._document
      .getElementById('appFavicon')
      .setAttribute('href', `${favicon}-favicon.ico`);
  }
  ngAfterViewInit() {
    // For sticky header
    if (this.isBrowser && this.isShow) {
      const distance = $('header').offset().top,
        $window = $(window);
      $(window).scroll(function () {
        if ($(this).scrollTop() > 5) {
          $('body').addClass('sticky');
          const ht = $('header').innerHeight();
          $('.empty').css({ 'min-height': ht });
        } else {
          $('body').removeClass('sticky');
        }
      });
    }
  }
}
