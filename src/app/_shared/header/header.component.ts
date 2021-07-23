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
import { forkJoin, Subject } from 'rxjs';
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
  inquireData: any;
  submitErrMsg: string = '';
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
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setInit();
        } else {
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
            .subscribe((response) => {
              if (response.status != 404 && response.type === 'brand_page') {
                this.brandTitle = response.name;
                this.isMain = false;
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
    this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
  }
  setInit() {
    const header = this.apiService.getAPI(`${this.brandSlug}/header`);
    const news = this.apiService.getAPI(`${this.brandSlug}/news`);
    const inquire = this.apiService.getAPI(`${this.brandSlug}/brand/inquire`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([header, news, inquire, publication]).subscribe((results) => {
      this.header = results[0].data;
      this.news = results[1].data;
      this.inquireData = results[2].schema;
      this.publication = results[3];
      if (this.brandSlug != '1851') {
        this.getInquiry();
      }
    });
  }

  readMore(item: any) {
    return this.commonService.readMore(item);
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

  getInquiry() {
    if (typeof this.inquireData != 'undefined') {
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
}
