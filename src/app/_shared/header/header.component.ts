import {
  Component,
  ElementRef,
  HostListener,
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
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'lazysizes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchCloseBtn') searchCloseBtn;

  header: any = [];
  brandSlug: string;
  brandTitle!: string;
  isShow: boolean;
  publication: any;
  type: any;
  isBrowser!: boolean;
  news: any;
  resultData: any;
  editorialEmail: string;
  searchForm: FormGroup;
  subject: Subject<any> = new Subject();
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
  ga: any;
  isLoaded: boolean = false;
  socialIcons: any = [
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTwitter,
  ];
  faCaretRightIcon = faCaretRight;
  faSearch = faSearch;
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
  defaultBrandLogo: string;
  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private fb: FormBuilder,
    private _googleAnalyticsService: GoogleAnalyticsService,
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private _elementRef : ElementRef
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
              } else {
                this.brandSlug = '1851';
                this.brandId = '1851';
              }
              this.setInit();
            });
        }
      }
    });
  }
  setInit() {
    let headerApi = 'header';
    if (this.brandSlug !== '1851') {
      headerApi = `header?slug=${this.brandSlug}`;
    }
    const header = this.apiService.getAPI2(headerApi);
    const news = this.apiService.getAPI(`${this.brandSlug}/news`);
    const inquire = this.apiService.getAPI(`${this.brandSlug}/brand/inquire`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([header, news, inquire, publication]).subscribe((results) => {
      this.header = results[0].data;
      this.news = results[1].data;
      this.inquireData = results[2].schema;
      this.publication = results[3];
      this.isLoaded = true;

      this.setFavicon();
      if (this.brandSlug != '1851') {
        this.getInquiry();
        this.getContact();

        this.setEditorialEmail();
      }
    });
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

  onSearchSubmit(searchForm: any, type) {
    if (type === 'sidebar') {
      this.commonService.toggle();
    }
    this.searchCloseBtn.nativeElement.click();
    if (this.brandId === '1851') {
      this.router.navigate(['/searchpopup'], {
        queryParams: {
          search_input: searchForm.controls['searchInput'].value,
          brand_id: this.header.publication.id.toLowerCase(),
        },
      });
    } else {
      this.router.navigate([`/${this.brandSlug}/searchpopup`], {
        queryParams: {
          search_input: searchForm.controls['searchInput'].value,
          brand_id: this.brandId,
        },
      });
    }
    this.searchForm.controls['searchInput'].setValue('');
  }
  onKeyUp(): void {
    this.subject.next();
  }
  closeModal() {
    this.searchCloseBtn.nativeElement.click();
  }
  closeThanksModal(id) {
    $(`#${id}`).hide();
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
          // setTimeout(() => {
          //   $('#thanksModal').hide();
          // }, 10000);
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
    if (this.isBrowser && this.isShow && this.isLoaded) {
      const distance = $('header').offset().top,
        $window = $(window);
      $(window).scroll(function () {
        if ($(this).scrollTop() > 5) {
          $('body').addClass('sticky');
          const ht = $('header').innerHeight();
          $('.empty').css({ 'min-height': ht });
          $('.banner').css({ 'margin-top': ht });
        } else {
          $('body').removeClass('sticky');
          $('.banner').css({ 'margin-top': '0' });
        }
      });
    }
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
      
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.commonService.showmenu=false;
      $('.sidebar-dropdown-menu').removeClass('show');
      $('.sidebar-blur').removeClass('show');

    }
}

}
