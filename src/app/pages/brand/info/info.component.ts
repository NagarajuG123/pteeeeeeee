import { Component, OnInit } from '@angular/core';
import { ApiService  } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  brandInfo: any = [];
  items: any;
  brandSlug: any;
  categories: any = [];
  validData: Array<any> = [];
  staticContent: any;
  pdf: any;
  selectedIndex: number = 0;
  inquireForm: any;
  isStory: boolean = false;
  isInfo: boolean = false;
  isBought: boolean = false;
  isExecutive: boolean = false;
  isMarket: boolean = false;
  company!: string;
  geoJson: any;
  constructor(private apiService: ApiService,
    private commonService: CommonService,private route: ActivatedRoute, private router: Router,
) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.brandSlug = params.get('brandSlug');
        this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.company = response.name;
            this.apiService.getAPI(`${this.brandSlug}/brand-view`).subscribe((response) => {
              this.brandInfo = response.data;
            });
            this.getContents(params.get('item'));
          }
        });
      });
    this.categories = [
      {name: 'BRAND INFO', value: 'info'},
      {name: 'DOWNLOAD BRAND PDF', value: 'brand_pdf'},
      {name: 'LATEST STORIES', value: 'latest_stories'},
      {name: 'Why I BOUGHT', value: 'why-i-bought'},
      {name: 'EXECUTIVE Q&A', value: 'executive'},
      {name: 'AVAILABLE MARKETS', value: 'available-markets'},
    ];
    this.staticContent = ['why-i-bought', 'executive', 'available-markets'];
    this.apiService.getAPI(`${this.brandSlug}/brand-pdf`).subscribe((response) => {
      this.pdf = response.data;
    });
  }
  changeDownPDFUrl(url: any) {
    return url.replace('api.', '');
  }
  isVideo(item: any) {
    return this.commonService.isVideo(item);
 }
  getInquiry() {
    this.apiService.getAPI(`${this.brandSlug}/brand/inquire`).subscribe((response) => {
      this.inquireForm = response.schema;
    });
  }
 
  getContents(item: string | null) {
    let path;
    if (item === 'info') {
      path = 'brand-info';
      this.isInfo = true;
      this.selectedIndex = 0;
    } else if (item === 'latest_stories') {
      path = 'brand-latest-stories';
      this.isStory = true;
      this.selectedIndex = 2;
    } else if (this.staticContent.includes(item)) {
      path = 'brand-static-content';
    }
    this.apiService.getAPI(`${this.brandSlug}/${path}`).subscribe((response) => {
      this.items = response
      if (item === 'why-i-bought' && this.items.data.find((o: any) => o.slug === 'why-i-bought')) {
        this.items = this.items.data.find((o: any) => o.slug === 'why-i-bought');
        this.isBought = true;
        this.selectedIndex = 3;
      } else if (item === 'executive' && this.items.data.find((o: any) => o.slug === 'executive')) {
        this.items = this.items.data.find((o: any) => o.slug === 'executive');
        this.isExecutive = true;
        this.selectedIndex = 4;
      } else if (item === 'available-markets' && this.items.data.find((o: any) => o.slug === 'available-markets')) {
        this.items = this.items.data.find((o: any) => o.slug === 'available-markets');
        this.isMarket = true;
        this.selectedIndex = 5;
        
      }
    });
  }

}
