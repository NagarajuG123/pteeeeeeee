import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footer: any = [];
  brandSlug: string;
  s3Url = environment.s3Url;
  utmSlug:string;
  isShow:boolean;
  publication:any;

  socialIcons: any = [
    "fa fa-facebook-f",
    "fa fa-instagram",
    "fa fa-linkedin",
    "fa fa-youtube-play",
    "fa fa-twitter",
    "fa fa-globe",
  ];

  constructor(private apiService: ApiService, private router: Router,    
     private route: ActivatedRoute,
     public commonService: CommonService
    ) {
    this.route.queryParams
      .subscribe(params => {
        if(params.utm || params.utm_source || params.utm_medium || params.utm_campaign || params.utm_term || params.utm_content) {
          this.utmSlug = '1851';
          if(params.utm) {
            this.utmSlug = params.utm;
          }
        }
      });
  }

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === 'robots.txt' || this.brandSlug === 'widget') {
          this.isShow = false;
        } else if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setInit();
        } else {
          if(this.brandSlug.includes('?')) {
            this.brandSlug = this.brandSlug.split('?')[0];
          } 
          if(!this.brandSlug && this.utmSlug){
            this.brandSlug = this.utmSlug;
          }
          this.brandSlug = this.brandSlug.replace(/\+/g, '');
          this.apiService
            .getAPI2(`${this.brandSlug}`)
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
    this.isShow = true;
    let footerApi = 'footer';
    if (this.brandSlug !== '1851') {
      footerApi = `footer?slug=${this.brandSlug}`;
    }
    const footer = this.apiService.getAPI2(footerApi);
    forkJoin([footer]).subscribe((results) => {
      this.footer = results[0];
      this.publication =this.commonService.publication;
    });

  }
  isAwards() {
    return this.brandSlug === 'franchisedevelopmentawards' ? true : false;
  }
}
