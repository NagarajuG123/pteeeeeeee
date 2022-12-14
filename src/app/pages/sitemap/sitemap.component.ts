import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss'],
})
export class SitemapComponent implements OnInit {
  sitemap: any = [];
  year: any = [];
  month: any = [];
  data: any = [];
  brandSlug: any = [];
  apiUrl: any;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    private router: Router,
    public commonService: CommonService

  ) {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (
          this.brandSlug === 'sitemap' ||
          this.brandSlug === '' ||
          this.brandSlug.includes('#')
        ) {
          this.brandSlug = '1851';
        } else {
          this.brandSlug = this.brandSlug.replace(/\+/g, '');
        }
      }
    });
  }

  ngOnInit(): void {
    this.apiService
      .getAPI2(`${this.brandSlug.replace(/\+/g, '')}`)
      .subscribe((response) => {
        if (response.status != 404 && response.type === 'brand_page') {
          this.brandSlug = response.slug;
          this.apiUrl = `${this.brandSlug}/sitemap-page`;
          this.getSitemap();
        } else {
          this.apiUrl = `sitemap-page`;
          this.getSitemap();
        }
      });
    this.getMeta();
  }

  getSitemap() {
    this.apiService.getAPI(`${this.apiUrl}`).subscribe((response) => {
      this.sitemap = response;
      Object.keys(this.sitemap).forEach((year: any) => {
        const monthData: { month: string; number: any; url: any }[] = [];
        Object.keys(this.sitemap[year]).forEach((month) => {
          monthData.push({
            month: month,
            number: this.sitemap[year][month]['number']
              ? this.sitemap[year][month]['number']
              : 0,
            url: this.sitemap[year][month]['url']
              ? this.sitemap[year][month]['url']
              : '',
          });
        });
        this.data.push({
          year: year,
          data: monthData,
        });
      });
    });
  }

  getMeta() {
    this.apiService.getAPI2(`meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
          if (this.brandSlug === '1851') {
            this.metaService.setTitle(
              `Sitemap for ${this.commonService.publication.title} | ${this.commonService.publication.newsType}`
            );
          } else {
            this.metaService.setTitle(
              `Sitemap for ${this.brandSlug}  ${this.commonService.publication.title}  | ${this.commonService.publication.newsType}`
            );
            }
    });
  }
}
