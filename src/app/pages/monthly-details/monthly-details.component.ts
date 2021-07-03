import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-monthly-details',
  templateUrl: './monthly-details.component.html',
  styleUrls: ['./monthly-details.component.scss']
})
export class MonthlyDetailsComponent implements OnInit {
  details: any = [];
  banner: any = [];
  year!: any;
  month!: any;
  date!: any;
  id!: any;
  hasMore: boolean = false;
  constructor(private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.paramMap
        .subscribe(params => {
      this.year = params.get('year');
      this.month = params.get('month');
      this.date = params.get('date');
      this.id = params.get('id');
      const coverDate = new Date(`${this.year}-${this.month}-${this.date}`);

        this.apiService.getAPI(`1851/journal/cover-details/${this.month}/${this.year}/${this.date}/${this.id}?limit=11&offset=0`).subscribe((response) => {

        this.banner['data'] = response.data[0];
        this.banner['date'] = moment(coverDate).format('MMMM YYYY');
          this.details = response.data.slice(1, 11);
          this.hasMore = response.has_more;
      });
    });
  }
   getMoreData() {
    this.apiService.getAPI(`1851/journal/cover-details/${this.month}/${this.year}/${this.date}/${this.id}?limit=10&offset=${this.details.length + 1}`)
    .subscribe(result => {
      this.hasMore = result.has_more;
      result.data.forEach((element: any) => {
        this.details.push(element);
      });
    });
  }

}
