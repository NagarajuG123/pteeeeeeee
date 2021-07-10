import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from '../../_core/services/common.service';
import {environment} from 'src/environments/environment'
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  header: any = [];
  brandSlug = '1851';
  brandTitle!: string;
  inquireForm: any;
  isMain: boolean = true;
  isShow: boolean = true;
  publication: any;
  type: any;
  isBrowser!: boolean;
  news: any;
  editorialEmail = `${environment.editorialEmail}`
    searchForm: FormGroup;
  subject: Subject<any> = new Subject();
  scrollbarOptions: any;
  constructor(
    private apiService: ApiService,
    public commonService: CommonService, private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
        fb: FormBuilder,

  ) {
    this.searchForm = new FormGroup({
      search_input: new FormControl(''),
    });
    this.isBrowser = isPlatformBrowser(platformId);
}

  ngOnInit(): void {
    this.getPublication();
    this.setSlug();
    this.subject
      .subscribe(() => {
        this.apiService.getAPI(`search?q=${this.searchForm.controls['search_input'].value}&filter_by[]=author&filter_by[]=title&filter_by[]=description&filter_by[]=keywords&limit=10&sort_by=newest&brand_id=${this.publication.id.toLowerCase()}`)
          .subscribe(res => {
            this.news = res.data;
          });
      });
  }
  setSlug() {
    this.router.events
    .subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setHeader();
        } else {
          this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`).subscribe((response) => {
            if (response.status != 404 && response.type === 'brand_page') {
              this.brandTitle = response.name;
              this.isMain = false;
              this.brandSlug = response.slug;
            } else {
              this.brandSlug = '1851';
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
    this.apiService.getAPI(`1851/publication-instance`).subscribe((response) => {
      this.publication = response;
    });
  }
  getNews() {
    this.apiService.getAPI(`${this.brandSlug}/news`).subscribe((response) => {
      this.news = response.data;
    });
  }
  getInquire() {
    this.apiService.getAPI(`${this.brandSlug}/brand-inquire`).subscribe((response) => {
      this.inquireForm = response.schema;
    });
  }
   readMore(item: any) {
    return this.commonService.readMore(item, 'franbuzz');
  }
  onSearchSubmit(searchForm: FormGroup) {
    let instance = ['1851', 'ee', '1903'];
    if (this.publication.id.toLowerCase().includes(instance)) {
      window.location.href = `/searchpopup?search_input=${searchForm.controls['search_input'].value}&brand_id=${this.publication.id.toLowerCase()}`;
    } else {
      window.location.href = `/${this.brandSlug}/searchpopup?search_input=${searchForm.controls['search_input'].value}&brand_id=${this.publication.id.toLowerCase()}`;
    }
    this.searchForm.controls['search_input'].setValue('');
  }
  
  onKeyUp(): void {
    this.subject.next();
  }
}
