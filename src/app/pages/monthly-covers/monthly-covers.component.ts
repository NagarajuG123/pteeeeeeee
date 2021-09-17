import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cover } from 'src/app/_core/models/cover.model';
import { Meta } from 'src/app/_core/models/meta.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

const RESULT_KEY = makeStateKey<any>('coversState');

@Component({
  selector: 'app-monthly-covers',
  templateUrl: './monthly-covers.component.html',
  styleUrls: ['./monthly-covers.component.scss'],
})
export class MonthlyCoversComponent implements OnInit {
  hasMore: boolean;
  firstBlock: Cover[] = [];
  secondBlock: Cover[] = [];
  metaData: Meta[] = [];
  publication!: string;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private tstate: TransferState,
    private cdr: ChangeDetectorRef,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const coverData = this.tstate.get(RESULT_KEY, {});
      this.firstBlock = coverData['first'];
      this.secondBlock = coverData['second'];
      this.hasMore = coverData['hasMore'];
      this.metaData = coverData['meta'];
      this.publication = coverData['publicationTitle'];
    } else {
      const coverData = {};
      const coverApi = this.apiService.getAPI(
        `1851/journal/monthly-covers?limit=14&offset=0`
      );
      const metaApi = this.apiService.getAPI(`1851/meta`);
      const publicationApi = this.apiService.getAPI(
        `1851/publication-instance`
      );

      forkJoin([coverApi, metaApi, publicationApi])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          coverData['first'] = response[0].data;
          coverData['second'] = response[0].data.slice(4, 14);
          coverData['hasMore'] = response[0].has_more;
          coverData['meta'] = response[1].data;
          coverData['publicationTitle'] = response[2].title;
          this.metaService.setSeo(coverData['meta']);
          this.metaService.setTitle(
            `Monthly Issues | ${coverData['publicationTitle']}`
          );
        });
      this.tstate.set(RESULT_KEY, coverData);
    }
  }
  openDetails(date: any) {
    const params = date.split('-');
    return `/monthlydetails/${params[1]}/${params[0]}/${params[2]}/3`;
  }
  getMoreData() {
    const offset = this.secondBlock.length + 4;
    this.apiService
      .getAPI(`1851/journal/monthly-covers?limit=5&offset=${offset}`)
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
