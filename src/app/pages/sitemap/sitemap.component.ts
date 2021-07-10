import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { environment } from 'src/environments/environment';
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

  constructor( private apiService: ApiService,private metaService:MetaService) { }

  ngOnInit(): void {
    this.getSitemap();
    this.getMeta();
  }

  getSitemap(){
    this.apiService.getAPI(`sitemap-page`).subscribe((response ) =>{
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

  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
        this.metaService.setTitle(`Sitemap for | ${result.title} | ${result.newsType}`);
        });
    });
  }
}