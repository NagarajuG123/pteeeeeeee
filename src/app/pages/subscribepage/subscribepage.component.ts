import { Component, OnInit } from '@angular/core';
import {ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-subscribepage',
  templateUrl: './subscribepage.component.html',
  styleUrls: ['./subscribepage.component.scss']
})
export class SubscribepageComponent implements OnInit {
  subscribeData: any =[];
  slug = '1851';

  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.getSubscribe();
  }
  
  getSubscribe() {
    this.apiService.getAPI(`${this.slug}/subscribe`).subscribe((response ) =>{
      this.subscribeData = response
    });
  }
}
