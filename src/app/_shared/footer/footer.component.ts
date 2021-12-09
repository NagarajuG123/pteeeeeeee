import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { forkJoin } from 'rxjs';
import 'lazysizes';
import { environment } from 'src/environments/environment';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footer: any = [];
  brandSlug: string;
  s3Url = environment.s3Url;
  socialIcons: any = [
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTwitter,
    faGlobe,
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setInit();
        } else {
          this.brandSlug = this.brandSlug.replace(/\+/g, '');
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug}`)
            .subscribe((response) => {
              if (response.type === 'brand_page') {
                this.brandSlug = response.slug;
              } else {
                this.brandSlug = '1851';
              }
              this.setInit();
            });
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

    forkJoin([footer]).subscribe((results) => {
      this.footer = results[0];
    });
  }
  isAwards() {
    return this.brandSlug === 'franchisedevelopmentawards' ? true : false;
  }
}
