import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from '../../_core/services/common.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  header: any = [];
  brandSlug = '1851';
  brandTitle!: string;
  isMain: boolean = true;
  isShow: boolean = true;
  publication: any;
  type: any;
  isBrowser!: boolean;
  news: any;
  resultData: any;
  editorialEmail = `${environment.editorialEmail}`;
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
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private fb: FormBuilder
  ) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getPublication();
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
  ngAfterViewInit() {
    // For sticky header
    if (this.isBrowser && this.isShow) {
      const distance = $('header').offset().top,
        $window = $(window);
      $(window).scroll(function () {
        if ($window.scrollTop() > distance) {
          $('body').addClass('sticky');
          const ht = $('header').innerHeight();
          $('.empty').css({ 'min-height': ht });
        } else {
          $('body').removeClass('sticky');
        }
      });
      // For navigation
      setTimeout(() => {
        $('nav ul li').has('ul').addClass('has_dd');
        $('nav > ul > li > a').click(function () {
          if ($(window).width() < 768) {
            $(this).parent().find('.megamenu').slideToggle();
            $(this).parent().siblings().find('.megamenu').slideUp();
          }
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
        });
      }, 500);
    }
  }
  setSlug() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setHeader();
        } else {
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
            .subscribe((response) => {
              if (response.status != 404 && response.type === 'brand_page') {
                this.brandTitle = response.name;
                this.isMain = false;
                this.brandSlug = response.slug;
                this.brandId = response.id;
                this.getInquiry();
              } else {
                this.brandSlug = '1851';
                this.brandId = '1851';
              }
              this.setHeader();
            });
        }
      }
    });
    this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
  }
  setHeader() {
    this.apiService.getAPI(`${this.brandSlug}/header`).subscribe((response) => {
      this.header = response.data;
      this.getNews();
    });
  }
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
  getNews() {
    this.apiService.getAPI(`${this.brandSlug}/news`).subscribe((response) => {
      this.news = response.data;
    });
  }

  readMore(item: any) {
    return this.commonService.readMore(item, 'franbuzz');
  }
  onSearchSubmit(searchForm: FormGroup) {
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
    this.apiService
      .postAPI(`${this.brandSlug}/brand-inquire`, values)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        console.log(result);
        if (typeof result.data !== 'undefined') {
          $('#inquireModalClose').click();
          $('#thanksModal').show();
          setTimeout(() => {
            $('#thanksModal').hide();
          }, 10000);
        } else {
          //show error
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
          this.isInquire = true;
          this.inquireTitle = response.schema.menu_title;
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
              type: item === 'cust_field' ? 'textarea' : 'text',
              pattern: response.schema.properties[item].pattern || '',
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
}
