import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
    this.apiService.getHeader().subscribe((response) => {
      this.menu = response;
    });
  }
}
