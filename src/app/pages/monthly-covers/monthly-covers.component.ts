import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-monthly-covers',
  templateUrl: './monthly-covers.component.html',
  styleUrls: ['./monthly-covers.component.scss']
})
export class MonthlyCoversComponent implements OnInit {
  has_more: any = [];
  mainCover: any = null;
  firstBlock: any = [];
  secondBlock: any = [];
  list: Array<any> = [''];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.closeMenu();
    this.getCoverData();
  }
  getCoverData() {
    this.apiService.getAPI(`1851/journal/monthly-covers?limit=7&offset=0`).subscribe((response ) =>{
      this.firstBlock = response.data.slice(1,7);
      this.mainCover = response.data[0];
      this.has_more = response.has_more;
    });
  }
  openDetails(date:any) {
  }
  getMoreData() {}
  closeMenu() {
    $('body').toggleClass('sb-sidenav-toggled');
  }
}
