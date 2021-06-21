import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  adsData: any = [];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    let slug = '1851';
    this.apiService.getAPI(`${slug}/columns`).subscribe((response ) =>{
      this.adsData = response.data[0];
    });
  }
}
