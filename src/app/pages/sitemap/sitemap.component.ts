import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
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
      .subscribe((response) => {
        if (response.status != 404 && response.type === 'brand_page') {
          this.brandSlug = response.slug;
          this.apiUrl = `${this.brandSlug}/sitemap-page`;
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
              : '',
          });
        });
        this.data.push({
          year: year,
          data: monthData,
        });
      });
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