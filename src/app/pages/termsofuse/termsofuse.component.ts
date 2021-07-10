import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.scss']
})
export class TermsofuseComponent implements OnInit {
  termsData: any=[];
  slug= '1851';

  constructor( private apiService: ApiService,private metaService:MetaService) { }

  ngOnInit(): void {
    this.getTermsofUse();
    this.getMeta();
  }

  getTermsofUse() {
    this.apiService.getAPI(`${this.slug}/terms-of-use`).subscribe((response ) =>{
      this.termsData = response;
    });
  }

  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
      this.metaService.setTitle(`Terms of use | ${result.title}`);
      });
    });
  }
}
