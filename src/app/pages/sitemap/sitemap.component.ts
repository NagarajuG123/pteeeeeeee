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

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSitemap();
  }

  getSitemap(){
    this.apiService.getAPI(`sitemap-page`).subscribe((response ) =>{
      this.sitemap = response;
      console.log(this.sitemap);
      // Object.keys(this.sitemap['data']).forEach(this.year => {
      //   const monthData=[];
      //   Object.keys(this.sitemap['data'][this.year]).forEach(this.month => {
          
      //   });
        
      // });
    });
  }
}
