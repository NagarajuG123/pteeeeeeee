import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

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
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.getCoverData();
  }
  getCoverData() {
    this.apiService.getAPI(`1851/journal/monthly-covers?limit=7&offset=0`).subscribe((response ) =>{
      this.firstBlock = response.data.slice(1,7);
      this.mainCover = response.data[0];
      this.has_more = response.has_more;
    });
  }
  openDetails(date: any) {
    const params = date.split('-');
    return `/monthlydetails/${params[1]}/${params[0]}/${params[2]}/3`;
  }
  getMoreData() {
    const offset = this.secondBlock.length + 7;
    this.apiService.getAPI(`1851/journal/monthly-covers?limit=5&offset=${offset}`).subscribe((response ) =>{
      this.has_more = response.has_more;
      response.data.forEach((item: any) => {
        this.secondBlock.push(item);
      });
    });
    this.cdr.detectChanges();
  }
  
}