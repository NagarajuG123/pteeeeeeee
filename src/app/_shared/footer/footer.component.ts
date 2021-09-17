import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/_core/services/common.service';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footer: any = [];
  brandSlug: string;
  isFooter: boolean;
  brandContact: any;
  brandId: string = '1851';
  isBrowser: boolean;
  news: any;
  socialIcons: any = [
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTwitter,
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private commonService: CommonService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.isFooter = true;
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setInit();
        } else {
          if (this.brandSlug === 'robots.txt') {
            this.isFooter = false;
          } else {
            this.brandSlug = this.brandSlug.replace(/\+/g, '');
            this.apiService
              .getAPI(`get-brand-by-slug/${this.brandSlug}`)
              .subscribe((response) => {
                if (response.type === 'brand_page') {
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
      }
    });
  }

  setInit() {
    let footerApi = 'footer';
    if (this.brandSlug !== '1851') {
      footerApi = `footer?slug=${this.brandSlug}`;
    }
    const footer = this.apiService.getAPI2(footerApi);
    const news = this.apiService.getAPI(`${this.brandSlug}/news`);
    const inquire = this.apiService.getAPI(`${this.brandSlug}/brand/contact`);

    forkJoin([footer, news, inquire]).subscribe((results) => {
      this.footer = results[0];
      this.brandContact = results[2].schema;
    });
  }
}
