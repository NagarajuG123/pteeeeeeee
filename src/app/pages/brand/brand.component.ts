import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  slug: any;
  type: string = '';
  mostRecent: any = [];
  company: string = '';
  scrollOffset: number = 0;
  apiUrl: string = '';
  hasMore: boolean = false;
  categorySlug: any = '';
  mostRecentUrl: any;
  dynamicUrl: any;
  dynamicFirst: any =[];
  dynamicSecond: any = [];
  topBlock:any = [];
  metaUrl: any = [];
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private metaService: MetaService

  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.slug = params.get('brandSlug');
        if (params.get('categorySlug')) {
          this.categorySlug = params.get('categorySlug');
        } 
        this.apiService.getAPI(`get-brand-by-slug/${this.slug}`).subscribe(async (response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.type = response.type;
            this.company = response.name;
            if (this.type === 'category_page' || (this.type === 'brand_page' && this.categorySlug != '')) {
              this.apiUrl = `1851/${this.slug}/featured`;
              this.mostRecentUrl = `1851/${this.slug}/most-recent`;
              this.metaUrl = `1851/${this.slug}/meta`;
              if (this.categorySlug != '') {
                this.apiUrl = `${this.slug}/${this.categorySlug}/featured`;
                this.mostRecentUrl = `${this.slug}/${this.categorySlug}/most-recent`;
                this.metaUrl = `${this.slug}/${this.categorySlug}/meta`;
              }
              this.getMostRecent();
              this.getCategoryMeta();
            } else if (this.type === 'brand_page' && !this.categorySlug) {
              this.apiUrl = `${this.slug}/featured-articles`;
            }
            else if(this.type === 'dynamic_page' && !this.categorySlug){
              this.dynamicUrl = `${this.slug}`;
              this.getDynamic();
              this.getMoreDynamic();
            }
            this.getMeta();
          }
        });
    });
  }

  getDynamic(){
    this.apiService.getAPI(`page/${this.dynamicUrl}?limit=20&offset=${this.scrollOffset}`).subscribe((response) => {
      this.topBlock = response.data;
      this.dynamicFirst = response.data.stories.slice(0, 10);
      this.dynamicSecond = response.data.stories.slice(10, 30);
      this.hasMore = response.has_more;
      this.metaService.setSeo(response.data.stories.meta);
      this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
        this.metaService.setTitle(`${this.dynamicUrl}| ${result.title}`);
        });
    });
  }

  getMoreDynamic() {
    this.apiService.getAPI(`${this.dynamicUrl}?limit=10&offset=${this.dynamicSecond.length + 1}`)
    .subscribe(result => {
      this.hasMore = result.has_more;
      result.data.stories.forEach((element: any) => {
        this.dynamicSecond.push(element);
      });
    });
  }

  getMostRecent() {
    this.apiService.getAPI(`${this.mostRecentUrl}?limit=10&offset=${this.scrollOffset}`).subscribe((response) => {
      this.mostRecent = response.data;
      this.hasMore = response.has_more;
      this.metaService.setSeo(response.data.meta);
    });
  }
 
  readMore(item: any) {
    return this.commonService.readMore(item, '');
  }
  getMoreData() {
    this.apiService.getAPI(`${this.mostRecentUrl}?limit=10&offset=${this.mostRecent.length + 1}`)
    .subscribe(result => {
      this.hasMore = result.has_more;
      result.data.forEach((element: any) => {
        this.mostRecent.push(element);
      });
    });
  }
  getMeta() {
    this.apiService.getAPI(`${this.slug}/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
  getCategoryMeta(){
    this.apiService.getAPI(`${this.metaUrl}`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
}
