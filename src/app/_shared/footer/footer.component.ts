import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   footer: any =[];
   publication: any =[];
  brandSlug = '1851';
  isFooter: boolean = true;
  isBrandFooter: boolean = false;
  brandContact: any;
  searchForm: FormGroup;
  brandId: string = '1851';
  isBrowser: boolean;
  subject: Subject<any> = new Subject();
  news: any;
  constructor( private apiService: ApiService,private router:Router, @Inject(PLATFORM_ID) platformId: Object,fb: FormBuilder ) { 
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getPublication();
    this.router.events
    .subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setFooter();
        } else {
          if (this.brandSlug === 'robots.txt') {
            this.isFooter = false;
          } else {
            this.brandSlug = this.brandSlug.replace(/\+/g, '');
            this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
              if (response.type === 'brand_page') {
                this.brandSlug = response.slug;
                this.isBrandFooter = true;
                this.brandId = response.id;
                this.getContact();
              } else {
                this.brandSlug = '1851';
                this.brandId ='1851';
              }
              this.setFooter();
            });
          }
        }
        
      }
    }); 
    this.subject.subscribe(() => {
      this.apiService
        .getAPI(
          `search?q=${
            this.searchForm.controls['searchInput'].value
          }&filter_by[]=author&filter_by[]=title&filter_by[]=description&filter_by[]=keywords&limit=10&sort_by=newest&brand_id=${this.brandId}`
        )
        .subscribe((res) => {
          this.news = res.data;
        });
    });
  }

  setFooter() {
  this.apiService.getAPI(`${this.brandSlug}/footer`).subscribe((response) => {
    this.footer = response.data;
    this.getNews();
  });
 }
  getNews() {
    this.apiService.getAPI(`${this.brandSlug}/news`).subscribe((response) => {
      this.news = response.data;
    });
  }
  getPublication(){
    this.apiService.getAPI(`1851/publication-instance`).subscribe((response ) =>{
      this.publication = response;
    });
  }
  onSearchSubmit(searchForm: FormGroup) {
    if (this.brandId === '1851') {
      window.location.href = `/searchpopup?search_input=${searchForm.controls['searchInput'].value}&brand_id=${this.publication.id.toLowerCase()}`;
    } else {
      window.location.href = `/${this.brandSlug}/searchpopup?search_input=${searchForm.controls['searchInput'].value}&brand_id=${this.brandId}`;
    }
    this.searchForm.controls['searchInput'].setValue('');
  }
  getContact() {
    this.apiService.getAPI(`${this.brandSlug}/brand/contact`).subscribe((response ) =>{
      this.brandContact = response.schema;
    });
  }
  onKeyUp(): void {
    this.subject.next();
  }
}
