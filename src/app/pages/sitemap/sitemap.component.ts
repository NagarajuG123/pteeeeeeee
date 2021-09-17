import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
<<<<<<< HEAD
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Sitemap } from 'src/app/_core/models/sitemap';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { Meta } from 'src/app/_core/models/meta.model';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {
  sitemap: Sitemap [] =[];
  data: Sitemap [] = [];
  metaData: Meta[] = [];
  publication!: string;
  newsType!: string;
  brandSlug: string = '';
  apiUrl: string = '';
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();


  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private tstate: TransferState) {
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
      .getAPI(`get-brand-by-slug/${this.brandSlug}`)
      .pipe(takeUntil(this.onDestroy$))
=======
import { MetaService } from 'src/app/_core/services/meta.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
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
      .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
      .subscribe((response) => {
        if (response.status != 404 && response.type === 'brand_page') {
          this.brandSlug = response.slug;
          this.apiUrl = `${this.brandSlug}/sitemap-page`;
<<<<<<< HEAD
        } else {
          this.apiUrl = `sitemap-page`;
        }
        this.getSitemap();
      });
  }

  getSitemap(){
    const RESULT_KEY = makeStateKey<any>(`${this.brandSlug}sitemapState`);
    if(this.tstate.hasKey(RESULT_KEY)){
      const sitemapData = this.tstate.get(RESULT_KEY,{});
      this.sitemap = sitemapData['data'];
      this.metaData = sitemapData['meta'];
      this.publication = sitemapData['publication'];
      this.newsType = sitemapData['newsType'];
      this.metaService.setSeo(this.metaData);
      this.metaService.setTitle(`Terms of use | ${this.publication}`);
      if (this.brandSlug === '1851') {
        this.metaService.setTitle(`Sitemap for ${this.publication} | ${this.newsType}`);
      } else {
        this.metaService.setTitle(`Sitemap for ${this.brandSlug} ${this.publication} | ${this.newsType}`);
      }
      Object.keys(sitemapData['data']).forEach((year: any) => {
        const monthData: { month: string; number: number; url: any }[] = [];
        Object.keys(this.sitemap[year]).forEach((month) => {
          monthData.push({
            month: month,
            number: sitemapData['data'][year][month]['number']
              ? sitemapData['data'][year][month]['number']
              : 0,
            url: sitemapData['data'][year][month]['url']
              ? sitemapData['data'][year][month]['url']
=======
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
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
              : '',
          });
        });
        this.data.push({
          year: year,
          data: monthData,
        });
      });
<<<<<<< HEAD
    }
    else{
      const sitemapData:any = {};
      const sitemapApi = this.apiService.getAPI(`${this.apiUrl}`);
      const metaApi = this.apiService.getAPI(`${this.brandSlug}/meta`);
      const publicationApi = this.apiService.getAPI(`${this.brandSlug}/publication-instance`);
      
      forkJoin([sitemapApi,metaApi,publicationApi]).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
        sitemapData['data'] = response[0];
        sitemapData['meta'] = response[1].data;
        sitemapData['publication'] = response[2].title;
        sitemapData['newsType'] = response[2].newsType;
        this.metaService.setSeo(sitemapData['meta']);
        if (this.brandSlug === '1851') {
          this.metaService.setTitle(`Sitemap for ${sitemapData['publication']} | ${sitemapData['newsType']}`);
        } else {
          this.metaService.setTitle(`Sitemap for ${this.brandSlug} ${sitemapData['publication']} | ${sitemapData['newsType']}`);
        }
        this.tstate.set(RESULT_KEY,sitemapData);
      });
    }
  }

}
=======
    });
  }

  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((result) => {
          if (this.brandSlug === '1851') {
            this.metaService.setTitle(
              `Sitemap for ${result.title} | ${result.newsType}`
            );
          } else {
            this.metaService.setTitle(
              `Sitemap for ${this.brandSlug}  ${result.title}  | ${result.newsType}`
            );
          }
        });
    });
  }
}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
