import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from '../../_core/services/common.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebar: any = [];
  publication: any = [];
  brandSlug = '1851'
  brandTitle!: string;

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
        }
        this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
          if ((typeof response.id !== 'undefined' || response.id === null) && response.type !== 'dynamic_page') {
            this.brandTitle = response.name;
            this.brandSlug = response.slug;
          }
          else{
            this.brandSlug = '1851';
          }
        this.apiService.getAPI(`${this.brandSlug}/sidebar`).subscribe((response) => {
        this.sidebar = response.data;
        });
      });
    }
   }); 
  }

  readMore(item: any) {
    return this.common.readMore(item);
  }

  closeMenu() {
    // $('body').toggleClass('menu-open');
  }
}

