import { Component, OnInit } from '@angular/core';
import { ApiService  } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';

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
  selectedIndex: number = 0;
  inquireForm: any;
  isStory: boolean = false;
  isInfo: boolean = false;
  isBought: boolean = false;
  company!: string;
  constructor(private apiService: ApiService,
    private commonService: CommonService,private route: ActivatedRoute, private router: Router,) { }

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
    }
    else if (item === 'why-i-bought') {
      path = 'brand-why-i-bought';
      this.isBought = true;
      this.selectedIndex = 3;
    }
    this.apiService.getAPI(`${this.brandSlug}/${path}`).subscribe((response) => {
      this.items = response;
    });
  }

}
