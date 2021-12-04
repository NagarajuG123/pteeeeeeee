import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cover } from 'src/app/_core/models/cover.model';
import { Meta } from 'src/app/_core/models/meta.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import 'lazysizes';
import { faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

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
  publication!: string;
  faPlus = faPlus;
  faAngleRight = faAngleRight;
  s3Url = environment.s3Url;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    const coverApi = this.apiService.getAPI(
      `1851/journal/monthly-covers?limit=14&offset=0`
    );
    const metaApi = this.apiService.getAPI(`1851/meta`);
    const publicationApi = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([coverApi, metaApi, publicationApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        this.firstBlock = response[0].data.slice(0,4);
        this.secondBlock = response[0].data.slice(4, 14);
        this.hasMore = response[0].has_more;
        this.metaData = response[1].data;
        this.publication = response[2].title;
        this.metaService.setSeo(this.metaData);
        this.metaService.setTitle(`Monthly Issues | ${this.publication}`);
      });
  }
  openDetails(date: any) {
    const params = date.split('-');
    return `/monthlydetails/${params[1]}/${params[0]}/${params[2]}/3`;
  }
  getMoreData() {
    const offset = this.secondBlock.length + 4;
    this.apiService
      .getAPI(`1851/journal/monthly-covers?limit=4&offset=${offset}`)
      .subscribe((response) => {
        this.hasMore = response.has_more;
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
