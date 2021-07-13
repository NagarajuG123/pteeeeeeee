import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {
  sitemap: any =[];
  year: any=[];
  month: any=[];
  data: any=[];
  brandSlug: any = [];
  apiUrl: any;

  constructor( private apiService: ApiService,private metaService:MetaService,private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.apiUrl = `sitemap-page`;
          this.getSitemap();
        } else {
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`)
            .subscribe((response) => {
              if (response.status != 404 && response.type === 'brand_page') {
                this.brandSlug = response.slug;
                this.apiUrl = `${this.brandSlug}/sitemap-page`;
                this.getSitemap();
              }
            });
        }
      }
      
    });
  }

  getSitemap(){
    this.apiService.getAPI(`${this.apiUrl}`).subscribe((response ) =>{
      this.sitemap = response;
      Object.keys(this.sitemap).forEach((year: any) => {
        const monthData: { month: string; number: any; url: any; }[] = [];
        Object.keys(this.sitemap[year]).forEach(month => {
          monthData.push({
            month: month,
            number: this.sitemap[year][month]['number'] ? this.sitemap[year][month]['number'] : 0,
            url: this.sitemap[year][month]['url'] ? this.sitemap[year][month]['url'] : ''
          });
        });
        this.data.push({
          year: year,
          data: monthData
      });
    });
  });
  }

  // getBrandSitemap(){
  //   this.apiService.getAPI(`${this.brandSlug}/sitemap-page`).subscribe((response ) =>{
  //     this.sitemap = response;
  //     Object.keys(this.sitemap).forEach((year: any) => {
  //       const monthData: { month: string; number: any; url: any; }[] = [];
  //       Object.keys(this.sitemap[year]).forEach(month => {
  //         monthData.push({
  //           month: month,
  //           number: this.sitemap[year][month]['number'] ? this.sitemap[year][month]['number'] : 0,
  //           url: this.sitemap[year][month]['url'] ? this.sitemap[year][month]['url'] : ''
  //         });
  //       });
  //       this.data.push({
  //         year: year,
  //         data: monthData
  //     });
  //   });
  // });
  // }
  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
        this.metaService.setTitle(`Sitemap for | ${result.title} | ${result.newsType}`);
        });
    });
  }
}