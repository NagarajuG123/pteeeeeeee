import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {
  adsData: any = [];
  ads: any =[];
  slug: string = '1851';

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    this.apiService.getAPI(`${this.slug}/ads?limit=10&offset=0`).subscribe((response ) =>{
      this.adsData = response;
      if(response.data){
        this.ads = response.data[0];
      }
    });
  }
}
