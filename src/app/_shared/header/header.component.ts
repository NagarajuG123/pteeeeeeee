import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/_core/services/api.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const HEADER_KEY = makeStateKey<any>('headerState');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  slug: string = '';
  header: any;
  socialIcons: any = [
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTwitter,
  ];
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  faCaretRightIcon = faCaretRight;
  room1903Url: string = environment.room1903Url;
  eeUrl: string = environment.eeUrl;

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private state: TransferState
  ) {}

  ngOnInit(): void {
    this.slug = '1851';

    this.apiService
      .getAPI2(`header`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        this.header = response;
      });
  }

  // onSearchSubmit(searchForm: any, type) {
  //   if (type === 'sidebar') {
  //     this.commonService.toggle();
  //   }
  // }
}
