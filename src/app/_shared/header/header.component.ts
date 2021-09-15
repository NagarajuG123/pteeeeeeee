import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/_core/services/api.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Details } from 'src/app/_core/models/details.model';
import { Router } from '@angular/router';

const HEADER_KEY = makeStateKey<any>('headerState');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchCloseBtn') searchCloseBtn;

  slug: string = '';
  header: any;
  socialIcons: any = [
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTwitter,
  ];
  isBrowser: boolean;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  faCaretRightIcon = faCaretRight;
  faSearch = faSearch;
  room1903Url: string = environment.room1903Url;
  eeUrl: string = environment.eeUrl;
  searchForm: FormGroup;
  subject: Subject<any> = new Subject();
  news: Details[] = [];
  brandId = '1851';
  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private state: TransferState,
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.slug = '1851';
    const header = this.apiService.getAPI2(`header`);
    const news = this.apiService.getAPI(`${this.slug}/news`);
    forkJoin([header, news])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((results) => {
        this.header = results[0];
        this.news = results[1].data;
      });

    this.subject.subscribe(() => {
      this.apiService
        .getAPI(
          `search?q=${this.searchForm.controls['searchInput'].value}&filter_by[]=author&filter_by[]=title&filter_by[]=description&filter_by[]=keywords&limit=10&sort_by=newest&brand_id=1851`
        )
        .subscribe((res) => {
          this.news = res.data;
        });
    });
  }

  onSearchSubmit(searchForm: any, type) {
    if (type === 'sidebar') {
      this.commonService.toggle();
    }
    this.searchCloseBtn.nativeElement.click();
    if (this.brandId === '1851') {
      this.router.navigate(['/searchpopup'], {
        queryParams: {
          search_input: searchForm.controls['searchInput'].value,
          brand_id: this.header.publication.id.toLowerCase(),
        },
      });
    } else {
      this.router.navigate([`/${this.slug}/searchpopup`], {
        queryParams: {
          search_input: searchForm.controls['searchInput'].value,
          brand_id: this.brandId,
        },
      });
    }
    this.searchForm.controls['searchInput'].setValue('');
  }
  onKeyUp(): void {
    this.subject.next();
  }
  closeModal() {
    this.searchCloseBtn.nativeElement.click();
  }
}
