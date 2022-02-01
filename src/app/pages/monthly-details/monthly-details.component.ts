import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { DatePipe } from '@angular/common';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { Details } from 'src/app/_core/models/details.model';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-monthly-details',
  templateUrl: './monthly-details.component.html',
  styleUrls: ['./monthly-details.component.scss'],
})
export class MonthlyDetailsComponent implements OnInit {
  details: Details[] = [];
  banner: Details[] = [];
  year!: any;
  month!: any;
  date!: any;
  id!: any;
  hasMore: boolean = false;
  faAngleRight = faAngleRight;
  coverDate: any;
  title: any;
  s3Url = environment.s3Url;
  isLoaded: boolean;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private metaService: MetaService,
    private datePipe: DatePipe,
    public commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.route.paramMap.subscribe((params) => {
      this.year = params.get('year');
      this.month = params.get('month');
      this.date = params.get('date');
      this.id = params.get('id');
      const date_number = Number(this.date);
      this.coverDate = new Date(`${this.year}-${this.month}-${this.date}`);
      this.apiService.getAPI(`1851/journal/cover-details/${this.month}/${this.year}/${this.date}/${this.id}?limit=11&offset=0`)
        .subscribe((response) => {
          this.banner = response;
          this.details = response.data.slice(1, 9);
          this.hasMore = response.has_more;
          this.apiService.getAPI(`1851/meta`).subscribe((response) => {
            this.metaService.setSeo(response.data);
            this.apiService
              .getAPI(`1851/publication-instance`)
              .subscribe((result) => {
                this.isLoaded = true;

                this.title = this.datePipe.transform(
                  this.coverDate,
                  'MMMM YYYY'
                );
                this.metaService.setTitle(
                  `${this.title} Issues | ${result.title}`
                );
              });
          });
        });
    });
  }
  getMoreData() {
    this.apiService
      .getAPI(
        `1851/journal/cover-details/${this.month}/${this.year}/${this.date}/${
          this.id
        }?limit=4&offset=${this.details.length + 1}`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.forEach((item: any) => {
          this.details.push(item);
        });
      });
    this.cdr.detectChanges();
  }
}
