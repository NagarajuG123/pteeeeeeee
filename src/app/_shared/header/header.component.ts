import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   headerData: any = [];

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
     this.getHeader();
  }

  //Header API 
  getHeader() {
    let slug = '1851';
    this.apiService.getAPI(`${slug}/header`).subscribe((response ) =>{
      this.headerData = response;
    });
  }

}