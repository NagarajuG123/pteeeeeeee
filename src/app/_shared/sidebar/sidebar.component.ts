import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from '../../_core/services/common.service';
import { Router, NavigationEnd } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { isPlatformBrowser } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() brand!: string;
  sidebar: any = [];
  publication: any = [];
  brandSlug = '1851';
  brandTitle!: string;
  downloadPdfUrl: any;
  isPdfEmail: any = false;
  visitSite: any;
  isMain: boolean = true;
  searchForm: FormGroup;
  brandId: string = '1851';
  isBrowser: boolean = false;
  pdfForm: any;
  isEmailSubmit: boolean = false;
  emailSubMessage: string;
  emailSubValid: boolean = false;
  isContact: boolean = false;
  contactTitle = '';
  contactFields: any;
  contactForm!: FormGroup;
  submittedContactForm: boolean = false;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    public common: CommonService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
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
  }

  ngOnInit(): void {
    this.getPublication();
    this.setInit();
  }
  setInit() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setSidebar();
        } else {
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
            .subscribe((response) => {
              if (response.status != 404 && response.type === 'brand_page') {
                this.brandTitle = response.name;
                this.brandSlug = response.slug;
                this.isMain = false;
                this.brandId = response.id;
                this.getContact();
              } else {
                this.brandSlug = '1851';
                this.brandId = '1851';
              }
              this.setSidebar();
            });
        }
      }
    });
  }
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
  setSidebar() {
    this.apiService
      .getAPI(`${this.brandSlug}/sidebar`)
      .subscribe((response) => {
        this.sidebar = response.data;
        if (this.brandSlug != '1851') {
          this.downloadPdfUrl = `${
            this.sidebar[this.brandSlug]['download-pdf']['url']
          }`;
          this.isPdfEmail = `${
            this.sidebar[this.brandSlug]['download-pdf']['email_popup']
          }`;
          this.visitSite = `${
            this.sidebar[this.brandSlug]['visit-website']['url']
          }`;
        }
      });
  }
  readMore(item: any) {
    return this.common.readMore(item, '');
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
  submitContactForm(values: any) {
    this.submittedContactForm = true;
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
          //show error
        }
        this.submittedContactForm = false;
      });
  }
  get formControlsValues() {
    return this.contactForm.controls;
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
}
