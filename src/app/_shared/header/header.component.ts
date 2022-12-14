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
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchCloseBtn') searchCloseBtn: ElementRef<HTMLInputElement>;
  @ViewChild('carouselBtn', { read: ElementRef, static: true })
  carouselBtn: ElementRef;
  fragment: string = '';
  header: any = [];
  brandSlug: string;
  brandTitle!: string;
  isBrowser!: boolean;
  news: any;
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
  isLearnMenu: boolean = false;
  isBrandLearnMenu: boolean = false;
  inquireData: any;
  submitErrMsg: string = '';
  s3Url = environment.s3Url;
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
  trending: any;
  isMain: boolean;
  utmSlug: string;
  logo: string;
  isShow: boolean;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private _elementRef: ElementRef
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
    this.route.queryParams.subscribe((params) => {
      if (
        params.utm ||
        params.utm_source ||
        params.utm_medium ||
        params.utm_campaign ||
        params.utm_term ||
        params.utm_content
      ) {
        this.utmSlug = '1851';
        if (params.utm) {
          this.utmSlug = params.utm;
        }
      }
    });
  }

  ngOnInit(): void {
    this.setSlug();
  }

  setSlug() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === 'robots.txt' || this.brandSlug === 'widget') {
          this.isShow = false;
        } else if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setInit();
        } else {
          if (this.brandSlug.includes('?')) {
            this.brandSlug = this.brandSlug.split('?')[0];
          }
          if (!this.brandSlug && this.utmSlug) {
            this.brandSlug = this.utmSlug;
          }

          this.apiService
            .getAPI2(`${this.brandSlug.replace(/\+/g, '')}`)
            .subscribe((response) => {
              if (response.status != 404 && response.type === 'brand_page') {
                this.brandTitle = response.name;
                this.brandSlug = response.slug;
                this.brandId = response.id;
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
    this.isShow = true;
    this.isMain = true;

    let headerApi = 'header';
    let trendingApi = 'articles/trending?limit=9&page=1';
    if (this.brandSlug !== '1851') {
      this.isMain = false;
      headerApi = `header?slug=${this.brandSlug}`;
      trendingApi = `articles/trending?limit=9&page=1&slug=${this.brandSlug}`;
    }
    const header = this.apiService.getAPI2(headerApi);
    const news = this.apiService.getAPI(
      `${this.brandSlug}/news?limit=4&offset=0`
    );
    const inquire = this.apiService.getAPI(`${this.brandSlug}/brand/inquire`);
    const trending = this.apiService.getAPI2(trendingApi);

    forkJoin([header, news, inquire, trending]).subscribe((results) => {
      this.header = results[0].data;
      this.news = results[1].data;
      this.inquireData = results[2].schema;
      if (this.commonService.otherSites() || this.commonService.stachecow()) {
        this.logo = `${environment.imageResizeUrl}/static/${this.commonService.publication?.id}small-logo.png`;
      }
      this.trending = results[3].data;
      if (this.trending && this.trending.length == 0) {
        this.commonService.trendingClass = 'topNoTrending';
      } else {
        this.commonService.trendingClass = 'top';
      }
      this.setFavicon();
      this.fragment = 'most-recent-stories';
      if (this.brandSlug != '1851') {
        this.getInquiry();
        this.getContact();
        this.setEditorialEmail();
        this.fragment = 'brand-latest-stories';
      }
    });
  }
  setEditorialEmail() {
    this.editorialEmail = 'editorial@1851franchise.com';
    if (this.commonService?.publication?.id.toLowerCase() === 'ee') {
      this.editorialEmail = 'editorial@estatenvy.com';
    } else if (this.commonService?.publication?.id == 'ROOM-1903') {
      this.editorialEmail = 'editorial@room1903.com';
    } else if (this.commonService?.publication?.id.toLowerCase() == 'stachecow') {
      this.editorialEmail = 'editorial@stachecow.com';
    }
  }

  onSearchSubmit(searchForm: any, type) {
    if (type === 'sidebar') {
      this.commonService.toggle();
    }
    this.searchCloseBtn.nativeElement.click();
    if (this.brandId === '1851') {
      window.location.href = `/searchpopup?search_input=${
        searchForm.controls['searchInput'].value
      }&brand_id=${this.header.publication.id.toLowerCase()}`;
    } else {
      window.location.href = `/${this.brandSlug}/searchpopup?search_input=${searchForm.controls['searchInput'].value}&brand_id=${this.brandId}`;
    }
    this.searchForm.controls['searchInput'].setValue('');
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
  get formControlsContactValues() {
    return this.contactForm.controls;
  }
  getInquiry() {
    if (this.inquireData !== null) {
      this.isInquire = true;
      this.inquireTitle = this.inquireData.title;
      const group: any = {};
      let objectKey = Object.keys(this.inquireData.properties);
      this.inquireFields = objectKey.map((item) => {
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
        if (response.schema !== null) {
          this.isContact = true;
          this.contactTitle = response.schema.title;
          const group: any = {};
          let objectKey = Object.keys(response.schema.properties);
          this.contactFields = objectKey.map((item) => {
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
          this.contactFields.forEach((item) => {
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
          this.contactForm.reset();
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
    this._document
      .getElementById('appFavicon')
      .setAttribute('href', `${this.commonService.publication.id}-favicon.ico`);
  }
  ngAfterViewInit() {
    // For sticky header
    if (this.isBrowser) {
      if (this.isBrowser && $('.carousel').hasClass('carousel-control-next')) {
        setInterval(() => {
          this.carouselBtn.nativeElement.click();
        }, 6000);
      }
    }
  }
  learnMenu() {
    this.isLearnMenu = !this.isLearnMenu;
  }
  brandMenu() {
    this.isBrandLearnMenu = !this.isBrandLearnMenu;
  }
  closeSidebar() {
    this.isLearnMenu = !this.isLearnMenu;
    this.isBrandLearnMenu = !this.isBrandLearnMenu;
    if (this.commonService.showmenu) {
      this.commonService.showmenu = false;
      $('.sidebar').removeClass('show');
      $('.sidebar-blur').removeClass('show');
      $('body').removeClass('noscroll');
    }
  }
  formReset() {
    this.contactForm.reset();
    this.inquireForm.reset();
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.commonService.showmenu = false;
      $('.sidebar').removeClass('show');
      $('.sidebar-blur').removeClass('show');
      $('body').removeClass('noscroll');
    }
  }
}
