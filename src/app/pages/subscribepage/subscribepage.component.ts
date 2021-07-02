import { Component, OnInit } from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/fiveColumn';
import {ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-subscribepage',
  templateUrl: './subscribepage.component.html',
  styleUrls: ['./subscribepage.component.scss']
})
export class SubscribepageComponent implements OnInit {
  data: FiveColumn[] =[];
  slug = '1851';
  title!:string ;

  constructor( private apiService : ApiService) { }

  ngOnInit(): void {
    this.getSubscribe();
  }
  
  getSubscribe() {
    this.apiService.getAPI(`${this.slug}/subscribe`).subscribe((response ) =>{
      this.data = response;
      this.title =  'SUBSCRIBE TO 1851 FRANCHISE';
    });
  }
}
