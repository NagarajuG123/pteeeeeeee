import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin, Subject } from 'rxjs';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @ViewChild('searchCloseBtn') searchCloseBtn;

  footer: any = [];
  publication: any = [];
  brandSlug:string;
  isFooter: boolean;
  isBrandFooter: boolean;
  brandContact: any;
  searchForm: FormGroup;
  brandId: string = '1851';
  isBrowser: boolean;
  subject: Subject<any> = new Subject();
  news: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.isFooter = true;
    this.isBrandFooter = false;
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.brandSlug = events.url.split('/')[1];
        if (this.brandSlug === '' || this.brandSlug.includes('#')) {
          this.brandSlug = '1851';
          this.setInit();
        } else {
          if (this.brandSlug === 'robots.txt') {
            this.isFooter = false;
          } else {
            this.brandSlug = this.brandSlug.replace(/\+/g, '');
            this.apiService
              .getAPI(`get-brand-by-slug/${this.brandSlug}`)
              .subscribe((response) => {
                if (response.type === 'brand_page') {
                  this.brandSlug = response.slug;
                  this.isBrandFooter = true;
                  this.brandId = response.id;
                } else {
                  this.brandSlug = '1851';
                  this.brandId = '1851';
                }
                this.setInit();
              });
          }
        }
      }
    });
    this.subject.subscribe(() => {
      this.apiService
        .getAPI(
          `search?q=${this.searchForm.controls['searchInput'].value}&filter_by[]=author&filter_by[]=title&filter_by[]=description&filter_by[]=keywords&limit=10&sort_by=newest&brand_id=${this.brandId}`
        )
        .subscribe((res) => {
          this.news = res.data;
        });
    });
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  setInit() {
    const footer = this.apiService.getAPI(`${this.brandSlug}/footer`);
    const news = this.apiService.getAPI(`${this.brandSlug}/news`);
    const inquire = this.apiService.getAPI(`${this.brandSlug}/brand/contact`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([footer, news, inquire, publication]).subscribe((results) => {
      this.footer = results[0].data;
      this.news = results[1].data;
      this.brandContact = results[2].schema;
      this.publication = results[3];
    });
  }
  onSearchSubmit(searchForm: FormGroup) {
    this.searchCloseBtn.nativeElement.click();

    if (this.brandId === '1851') {
      window.location.href = `/searchpopup?search_input=${searchForm.controls["searchInput"].value}&brand_id=${this.publication.id.toLowerCase()}`;
    } else {
      window.location.href = `/${this.brandSlug}/searchpopup?search_input=${searchForm.controls["searchInput"].value}&brand_id=${this.brandId}`;
    }
    this.searchForm.controls['searchInput'].setValue('');
  }
  onKeyUp(): void {
    this.subject.next();
  }
}
