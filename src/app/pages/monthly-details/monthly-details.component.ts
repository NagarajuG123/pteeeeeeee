import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { DatePipe } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
import { Details } from 'src/app/_core/models/details.model';
import { environment } from 'src/environments/environment';
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
  coverDate: any;
  title: any;
  s3Url = environment.s3Url;
  isLoaded: boolean;
  page= 1;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
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
      this.month = this.month.length == 1 ? this.month.padStart(2, '0') : this.month;
      this.coverDate = new Date(`${this.year}-${this.month}-${this.date}`);
      const bannerApi= this.apiService.getAPI2(`cover/banner?slug=${this.month}/${this.year}/${this.date}/${this.id}`)
      const detailsApi = this.apiService.getAPI2(`cover/details?slug=${this.month}/${this.year}/${this.date}/${this.id}&limit=8&page=1`)
      forkJoin([bannerApi,detailsApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
          this.banner = response[0];
          this.details = response[1].data;
          this.hasMore = response[1].hasMore;
          this.apiService.getAPI2(`meta`).subscribe((response) => {
            this.metaService.setSeo(response.data);
                this.isLoaded = true;

                this.title = this.datePipe.transform(
                  this.coverDate,
                  'MMMM YYYY'
                );
                this.metaService.setTitle(
                  `${this.title} Issues | ${this.commonService.publication.title}`
                );
          });
        });
    });
  }
  getMoreData() {
    this.apiService
      .getAPI2(
        `cover/details?slug=${this.month}/${this.year}/${this.date}/${this.id}&limit=4&page=${
          this.page + 2
        }`
      )
      .subscribe((result) => {
       this.hasMore = result.hasMore;
        result.data.forEach((item: any) => {
          this.details.push(item);
        });
        this.page++;
      });
    this.cdr.detectChanges();
  }
}
