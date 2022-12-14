import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetaService } from 'src/app/_core/services/meta.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { Meta } from 'src/app/_core/models/meta.model';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/_core/services/common.service';


@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.scss'],
})
export class TermsofuseComponent implements OnInit {
  termsData: any = [];
  metaData: Meta[] = [];
  slug = '1851';
  isBrowser!: boolean;
  isSponsored: boolean = false;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) platformId: Object,
    private route: ActivatedRoute,
    private tstate: TransferState,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    public commonService: CommonService

  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const termsApi = this.apiService.getAPI2(`terms-of-use`);
    const metaApi = this.apiService.getAPI2(`meta?page=termsofuse`);
    forkJoin([termsApi, metaApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        this.termsData = response[0];
        this.metaData = response[1].data;

        this.metaService.setSeo(this.metaData);
        this.metaService.setTitle(`Terms of use | ${this.commonService.publication.title}`);
      });
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      this.route.fragment.subscribe((fragment) => {
        if (fragment === 'sponsored') {
          this.isSponsored = true;
        }
      });
    }
  }
  imageLoaded() {
    if (this.isSponsored) {
      this.pageScrollService.scroll({
        scrollTarget: '#content-sponsored',
        document: this.document,
      });
    }
  }
  errorHandler(event: any) {
    event.target.src = `${environment.s3Url}termsofuse.png`;
  }
}
