import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.scss']
})
export class TermsofuseComponent implements OnInit {
  termsData: any=[];
  slug= '1851';

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTermsofUse();
  }

  getTermsofUse() {
    this.apiService.getAPI(`${this.slug}/terms-of-use`).subscribe((response ) =>{
      this.termsData = response;
    });
  }

}
