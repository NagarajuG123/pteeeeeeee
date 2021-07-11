import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.scss'],
})
export class TermsofuseComponent implements OnInit {
  termsData: any = [];
  slug = '1851';
  isBrowser: boolean;
  isSponsored: boolean = false;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) platformId: Object,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any,
    private pageScrollService: PageScrollService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getTermsofUse();
    this.getMeta();
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      this.route.fragment.subscribe((fragment: string) => {
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
  errorHandler(event) {
    event.target.src = '/assets/img/termsofuse.png';
  }
  getTermsofUse() {
    this.apiService
      .getAPI(`${this.slug}/terms-of-use`)
      .subscribe((response) => {
        this.termsData = response;
      });
  }

  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((result) => {
          this.metaService.setTitle(`Terms of use | ${result.title}`);
        });
    });
  }
}
