import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   footer: any =[];
   publication: any =[];
  brandSlug = '1851';
  isFooter: boolean = true;
  isBrandFooter: boolean = false;
  brandContact: any;
  searchForm: FormGroup;
  constructor( private apiService: ApiService,private router:Router,fb: FormBuilder ) { 
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getPublication();
    this.router.events
    .subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setFooter();
        } else {
          if (this.brandSlug === 'robots.txt') {
            this.isFooter = false;
          } else {
            this.brandSlug = this.brandSlug.replace(/\+/g, '');
            this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
              if (response.type === 'brand_page') {
                this.brandSlug = response.slug;
                this.isBrandFooter = true;
                this.getContact();
              } else {
                this.brandSlug = '1851';
              }
              this.setFooter();
            });
          }
        }
        
      }
    }); 
  }
  
  onSearchSubmit(searchForm: FormGroup) {
    let instance = ['1851', 'ee', '1903'];
    if (instance.includes(this.publication.id.toLowerCase())) {
      window.location.href = `/searchpopup?search_input=${
        searchForm.controls['searchInput'].value
      }&brand_id=${this.publication.id.toLowerCase()}`;
    } else {
      window.location.href = `/${this.brandSlug}/searchpopup?search_input=${
        searchForm.controls['searchInput'].value
      }&brand_id=${this.publication.id.toLowerCase()}`;
    }
    this.searchForm.controls['searchInput'].setValue('');
  }

  setFooter() {
  this.apiService.getAPI(`${this.brandSlug}/footer`).subscribe((response) => {
    this.footer = response.data;
  });
}
  getPublication(){
    this.apiService.getAPI(`1851/publication-instance`).subscribe((response ) =>{
      this.publication = response;
    });
  }
  getContact() {
    this.apiService.getAPI(`${this.brandSlug}/brand/contact`).subscribe((response ) =>{
      this.brandContact = response.schema;
    });
  }
}
