import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {
  adsData: any = [];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    this.apiService.getAds().subscribe((response: any) => {
      this.adsData = response;
      console.log(this.adsData);
    });
  }
}
