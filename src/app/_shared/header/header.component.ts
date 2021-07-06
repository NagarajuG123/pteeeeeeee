import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_core/services/api.service';
import { CommonService } from '../../_core/services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: any = [];

  constructor(private apiService: ApiService, public common: CommonService) {}

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.apiService.getHeader().subscribe((response) => {
      this.menu = response;
    });
  }
}
