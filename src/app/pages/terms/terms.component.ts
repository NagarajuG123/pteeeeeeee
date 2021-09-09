import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MetaService } from 'src/app/_core/services/meta.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { Terms } from 'src/app/_core/models/terms.model';
import { Meta } from 'src/app/_core/models/meta.model';

const RESULT_KEY = makeStateKey<any>('termsState');

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  termsData: any = [];
  metaData: Meta[] = [];
  publication!: string;
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
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const termsData = this.tstate.get(RESULT_KEY, {});
      this.termsData = termsData['data'];
      this.metaData = termsData['meta'];
      this.publication = termsData['publication'];
      this.metaService.setSeo(this.metaData);
      this.metaService.setTitle(`Terms of use | ${this.publication}`);
    } else {
      const termsData: any = {};

      const termsApi = this.apiService.getAPI(`${this.slug}/terms-of-use`);
      const metaApi = this.apiService.getAPI(`${this.slug}/publication-instance`);
      const publicationApi = this.apiService.getAPI(`${this.slug}/publication-instance`);

      forkJoin([termsApi,metaApi,publicationApi]).pipe(takeUntil(this.onDestroy$)).subscribe((response) =>{
        termsData['data'] = response[0];
        termsData['meta'] = response[1].data;
        termsData['publication'] = response[2].title;
        this.metaService.setSeo(termsData['meta']);
        this.metaService.setTitle(`Terms of use | ${termsData['publication']}`);
      });

        this.tstate.set(RESULT_KEY, termsData);
    } 
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
  errorHandler(event:any) {
    event.target.src = '/assets/img/termsofuse.png';
  }

}