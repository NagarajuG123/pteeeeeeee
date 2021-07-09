import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from '../../_core/services/common.service';
import {environment} from 'src/environments/environment'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  header: any = [];
  brandSlug = '1851';
  brandTitle!: string;
  inquireForm: any;
  isBrandPage: boolean = false;
  isShow: boolean = true;
  publication: any;
  type: any;
  editorialEmail = `${environment.editorialEmail}`
  constructor(private apiService: ApiService, public common: CommonService,private router:Router) {}

  ngOnInit(): void {
    this.getPublication();
    this.router.events
    .subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
        } else {
          this.brandSlug = this.brandSlug.replace(/\+/g, '');
          this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
            if (response.type === 'brand_page') {
              this.brandTitle = response.name;
              this.isBrandPage = true;
              this.brandSlug = response.slug;
            }
          });
        }
         this.apiService.getAPI(`${this.brandSlug}/header`).subscribe((response) => {
        this.header = response.data;
        });
    }
  }); 
  }
  getPublication() {
    this.apiService.getAPI(`1851/publication-instance`).subscribe((response) => {
      this.publication = response;
    });
  }
}
