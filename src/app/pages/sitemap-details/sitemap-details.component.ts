import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Meta } from 'src/app/_core/models/meta.model';
import { Sitemap } from 'src/app/_core/models/sitemap';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-sitemap-details',
  templateUrl: './sitemap-details.component.html',
  styleUrls: ['./sitemap-details.component.scss']
})
export class SitemapDetailsComponent implements OnInit {
  sitemap: Sitemap[] = [];
  metaData: Meta[] = [];
  publication!: string;
  newsType!: string;
  year: any;
  month: any;
  brandSlug: string = '';
  apiUrl: string = '';

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private metaService: MetaService,
    private router: Router,
    private tstate: TransferState,
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
      this.route.paramMap.subscribe((params) => {
      this.year = params.get('year');
      this.month = params.get('month');
      this.apiService
        .getAPI(`get-brand-by-slug/${this.brandSlug}`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          if (response.status != 404 && response.type === 'brand_page') {
            this.brandSlug = response.slug;
            this.apiUrl = `${this.brandSlug}/sitemap-page/${this.year}/${this.month}`;
          } else {
            this.apiUrl = `sitemap-page/${this.year}/${this.month}`;
          }
          this.getSitemapDetail();
        });
    });
  }

  getSitemapDetail(){
    const RESULT_KEY = makeStateKey<any>(`${this.brandSlug}sitemapDetailState`);
    if(this.tstate.hasKey(RESULT_KEY)){
      const sitemapDetail = this.tstate.get(RESULT_KEY,{});
      this.sitemap = sitemapDetail['data'];
      this.metaData = sitemapDetail['meta'];
      this.publication = sitemapDetail['publication'];
      this.newsType = sitemapDetail['newsType'];
      this.metaService.setSeo(this.metaData);
      this.metaService.setTitle(`Terms of use | ${this.publication}`);
    }
    else{
      const sitemapDetail:any = {};
      const sitemapDetailApi = this.apiService.getAPI(`${this.apiUrl}`);
      const metaApi = this.apiService.getAPI(`${this.brandSlug}/meta`);
      const publicationApi = this.apiService.getAPI(`${this.brandSlug}/publication-instance`);

      forkJoin([sitemapDetailApi,metaApi,publicationApi]).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
        sitemapDetail['data'] = response;
        sitemapDetail['meta'] = response[1].data;
        sitemapDetail['publication'] = response[2].title;
        sitemapDetail['newsType'] = response[2].newsType;
        this.metaService.setSeo(sitemapDetail['meta']);
        if (this.brandSlug === '1851') {
          this.metaService.setTitle(`Subscribe to | ${sitemapDetail['publication']} | ${sitemapDetail['newsType']}`);
        } else {
          this.metaService.setTitle(`Subscribe to | ${this.brandSlug} ${sitemapDetail['publication']} | ${sitemapDetail['newsType']}`);
        }
        if (response[0].status === 404) {
          this.router.navigateByUrl('/404');
        }
        this.tstate.set(RESULT_KEY,sitemapDetail);
      });
    }
  }
}
       