import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {
  menu: any =[];

  constructor(private apiService:ApiService) {}

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader(){
    let slug = '1851';
    this.apiService.getAPI(`${slug}/header`).subscribe((response ) =>{
      this.menu = response;
      console.log(this.menu);
    });
  }
}
