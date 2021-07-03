import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
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

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSitemap();
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
}