import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from '../../_core/services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: any = [];
  brandSlug = '1851';
  brandTitle!: string;
  inquireForm: any;
  constructor(private apiService: ApiService, public common: CommonService,private router:Router) {}

  ngOnInit(): void {
    this.router.events
    .subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
        } else {
          this.brandSlug = this.brandSlug.replace(/\+/g, '');
          this.getBrand();
          this.getInquiry();
        }
        this.apiService.getAPI(`${this.brandSlug}/header`).subscribe((response) => {
          this.menu = response.data;
        });
        
      }
    });
  }
  getBrand() {
    this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
      this.brandTitle = response.name;
    });
  }
  getInquiry() {
    this.apiService.getAPI(`${this.brandSlug}/brand/inquire`).subscribe((response) => {
      this.inquireForm = response.schema;
    });
  }
}
