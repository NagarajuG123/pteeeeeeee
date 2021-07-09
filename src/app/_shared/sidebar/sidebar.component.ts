import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from '../../_core/services/common.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() brand!: string;
  sidebar: any = [];
  publication: any = [];
  brandSlug = '1851'
  brandTitle!: string;
  contactForm: any;
  downloadPdf: any;
  visitSite: any;
  isMain: boolean = true;
  constructor(private apiService: ApiService, public common: CommonService,private router:Router) {}

  ngOnInit(): void {
    this.router.events
    .subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setSidebar();
        } else {
          this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug.replace(/\+/g, '')}`).subscribe((response) => {
            if (response.status != 404 && response.type === 'brand_page') {
              this.brandTitle = response.name;
              this.brandSlug = response.slug;
              this.isMain = false;
              this.getContactForm();
            } else {
              this.brandSlug = '1851';
            }
            this.setSidebar();
          });
        }
    }
    });
  }
 
  setSidebar() {
  this.apiService.getAPI(`${this.brandSlug}/sidebar`).subscribe((response) => {
    this.sidebar = response.data;
    if (this.brandSlug != '1851') {
      this.downloadPdf = `${this.sidebar[this.brandSlug]["download-pdf"]}`;
      this.visitSite = `${this.sidebar[this.brandSlug]['visit-website']}`;
    }
  });
}
  readMore(item: any) {
    return this.common.readMore(item);
  }
  getContactForm() {
  this.apiService.getAPI(`${this.brandSlug}/brand/contact`).subscribe((response) => {
      this.contactForm = response.schema;
    });
}
}

