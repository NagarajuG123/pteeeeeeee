import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cover } from 'src/app/_core/models/cover.model';
import { Meta } from 'src/app/_core/models/meta.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-monthly-covers',
  templateUrl: './monthly-covers.component.html',
  styleUrls: ['./monthly-covers.component.scss'],
})
export class MonthlyCoversComponent implements OnInit {
  hasMore: boolean;
  firstBlock: Cover = {};
  secondBlock: Cover[] = [];
  metaData: Meta[] = [];
  s3Url = environment.s3Url;
  isLoaded: boolean;
  page= 1;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private metaService: MetaService,
    public commonService: CommonService

  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    const bannerApi = this.apiService.getAPI2(`cover/banner`);
    const coverApi = this.apiService.getAPI2(`cover/images?limit=10&page=${this.page}`);
    const metaApi = this.apiService.getAPI2(`meta`);
    forkJoin([bannerApi,coverApi, metaApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        this.isLoaded = true;
        this.firstBlock = response[0].data;
        this.secondBlock = response[1].data;
        this.hasMore = response[1].hasMore;
        this.metaData = response[1].data;
       this.metaService.setSeo(this.metaData);
        this.metaService.setTitle(`Monthly Issues | ${this.commonService.publication.title}`);
      });
  }
  openDetails(date: any) {
    const params = date.split('-');
    return `/monthlydetails/${params[1]}/${params[0]}/${params[2]}/3`;
  }
  getMoreData() {
    const offset = this.secondBlock.length + 4;
    this.apiService
    .getAPI2(`cover/images?limit=5&page=${
      this.page + 2
    }`)
      .subscribe((response) => {
        this.hasMore = response.hasMore;
        this.page++;
        response.data.forEach((item: any) => {
          this.secondBlock.push(item);
        });
      });
    this.cdr.detectChanges();
  }

  readMoreCover(item: any) {
    let slug = '';
    if (typeof item?.story !== 'undefined') {
      slug = `${item?.story?.slug}/`;
    }
    return `${slug}`;
  }
}
