import { Component, OnInit } from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/five';
import {ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-subscribepage',
  templateUrl: './subscribepage.component.html',
  styleUrls: ['./subscribepage.component.scss']
})
export class SubscribepageComponent implements OnInit {
  data: FiveColumn[] =[];
  slug = '1851';
  title!:string ;

  constructor( private apiService : ApiService,private metaService: MetaService) { }

  ngOnInit(): void {
    this.getSubscribe();
    this.getMeta();
  }
  
  getSubscribe() {
    this.apiService.getAPI(`${this.slug}/subscribe`).subscribe((response ) =>{
      this.data = response;
      this.title =  'SUBSCRIBE TO 1851 FRANCHISE';
    });
  }
  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
}
