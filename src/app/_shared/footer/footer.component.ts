import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   footerData: any =[];
   publication: any =[];
   brandSlug = '1851';

  constructor( private apiService: ApiService,private router:Router ) { }

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
        this.apiService.getAPI(`${this.brandSlug}/footer`).subscribe((response) => {
          this.footerData = response.data;
        });
        this.apiService.getAPI(`1851/publication-instance`).subscribe((response ) =>{
          this.publication = response;
        });
      }
    }); 
  }
}
