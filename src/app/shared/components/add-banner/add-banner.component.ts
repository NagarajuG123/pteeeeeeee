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

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    this.apiService.getAds().subscribe((response: any) => {
      this.adsData = response;
      if(response['data']){
        this.adsData['first'] = response['data'][0];
      }
      this.ads = this.adsData['first'];
    });
  }
}
