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
  footerText:any;
  brandSlug: string;
  publication: any;
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
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    forkJoin([footer,publication]).subscribe((results) => {
      this.footer = results[0];
      this.publication=results[1];
    });
    this.footerHeading();
  }
  footerHeading()
    {
    if(this.publication.id.toLowerCase() == "stachecow") {
      this.footerText="Build the life you deserve"
    } else if(this.publication.id.toLowerCase() =="1851") {
      this.footerText= "For the love of franchising"
    } else if(this.publication.id.toLowerCase() =="ee") {
      this.footerText="For the love of home"
    }
    else {
      this.footerText="For the love of travel"
    }
    }
  isAwards() {
    return this.brandSlug === 'franchisedevelopmentawards' ? true : false;
  }
}
