import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.apiService.getHeader().subscribe((response) => {
      this.menu = response;
    });
  }
  openMenu() {}
}
