import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sitemap } from 'src/app/_core/models/sitemap';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-sitemap-details',
  templateUrl: './sitemap-details.component.html',
  styleUrls: ['./sitemap-details.component.scss']
})
export class SitemapDetailsComponent implements OnInit {
  sitemap: Sitemap[] = [];
  year: any = [];
  month: any = [];
  brandSlug: string = '';
  apiUrl: string = '';
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private tstate: TransferState
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
        .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
        .subscribe((response) => {
          if (response.status != 404 && response.type === 'brand_page') {
            this.brandSlug = response.slug;
            this.apiUrl = `${this.brandSlug}/sitemap-page/${this.year}/${this.month}`;
          } else {
            this.apiUrl = `sitemap-page/${this.year}/${this.month}`;
            this.getSitemapDetail();
          }
        });
    });
  }

  getSitemapDetail(){
    const RESULT_KEY = makeStateKey<any>(`${this.brandSlug}sitemapDetailState`);
    if(this.tstate.hasKey(RESULT_KEY)){
      const sitemapDetail = this.tstate.get(RESULT_KEY,{});
      this.sitemap = sitemapDetail['data'];
    }
    else{
      const sitemapDetail:any = {};
      this.apiService.getAPI(`${this.apiUrl}`).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
        sitemapDetail['data'] = response;
      if (response.status === 404) {
        this.router.navigateByUrl('/404');
      }
      this.tstate.set(RESULT_KEY,sitemapDetail);
    });
    }
  }

  getMonth(month: number) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month - 1];
  }
}
