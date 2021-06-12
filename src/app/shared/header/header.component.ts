import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
    this.apiService.getHeader().subscribe((response) => {
      this.headerData = response;
      console.log(this.headerData);
    });
  }

  openMenu() {
    
}
}