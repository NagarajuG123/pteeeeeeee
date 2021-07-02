import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  adsData: any = [];
  @Input() slug = '1851';
  @Input() type = '';

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    this.apiService.getAPI(`${this.slug}/ads`).subscribe((response) => {
      console.log(response)
      // this.adsData = response.data[0];
    });
  }
}
