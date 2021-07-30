import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  slug: any;
  type: string = '';
  mostRecent: any = [];
  categoryTrending: any = [];
  categoryParam = '';
  company: string = '';
  scrollOffset: number = 0;
  apiUrl: string = '';
  hasMore: boolean = false;
  categorySlug: any = '';
  mostRecentUrl: any;
  dynamicUrl: any;
  dynamicFirst: any = [];
  dynamicSecond: any = [];
  topBlock: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.apiService
        .getAPI(`get-brand-by-slug/${this.slug}`)
        .subscribe(async (response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.type = response.type;
            this.company = response.name;
            if (this.type === 'category_page') {
              this.apiUrl = `1851/${this.slug}/featured`;
              const mostRecentUrl = this.apiService.getAPI(`1851/${this.slug}/most-recent`);
              const metaUrl = this.apiService.getAPI(`1851/${this.slug}/meta`);
              const trendingUrl = this.apiService.getAPI(`1851/${this.slug}/trending?limit=10&offset=0`);
              this.setParam(this.slug);
              forkJoin([mostRecentUrl,metaUrl,trendingUrl]).subscribe((results) => {
                this.mostRecent = results[0].data;
                this.hasMore = results[0].has_more;
                this.metaService.setSeo(results[1].data);
                this.categoryTrending = results[2].data;
              }); 
            } else if (this.type === 'brand_page') {
              this.apiUrl = `${this.slug}/featured-articles`;
              this.getMeta();
            } else if (this.type === 'dynamic_page') {
              this.dynamicUrl = `${this.slug}`;
              this.getDynamic();
            }
          }
        });
    });
  }

  setParam(slug) {
    if (slug.includes('people')) {
      this.categoryParam = 'people';
    } else if (slug.includes('industry')) {
      this.categoryParam = 'industry';
    } else if (slug.includes('franchisee')) {
      this.categoryParam = 'franchisee';
    } else if (slug.includes('franchisor')) {
      this.categoryParam = 'franchisor';
    } else if (slug.includes('destinations')) {
      this.categoryParam = 'destinations';
    } else if (slug.includes('products')) {
      this.categoryParam = 'products';
    } else if (slug.includes('celebrities')) {
      this.categoryParam = 'celebrities';
    } else if (slug.includes('homes-to-own')) {
      this.categoryParam = 'homes-to-own';
    } else if (slug.includes('home-envy')) {
      this.categoryParam = 'home-envy';
    } else if (slug.includes('home-buzz')) {
      this.categoryParam = 'home-buzz';
    } else {
      this.categoryParam = 'columns';
    }
  }

  getDynamic() {
    this.apiService
      .getAPI(`page/${this.dynamicUrl}?limit=20&offset=${this.scrollOffset}`)
      .subscribe((response) => {
        this.topBlock = response.data;
        this.dynamicFirst = response.data.stories.slice(0, 10);
        this.dynamicSecond = response.data.stories.slice(10,20);
        this.hasMore = response.has_more;
        this.metaService.setSeo(this.dynamicFirst[0].meta);
        this.apiService
          .getAPI(`1851/publication-instance`)
          .subscribe((result) => {
            const Title =
              this.dynamicUrl.charAt(0).toUpperCase() +
              this.dynamicUrl.slice(1);
            this.metaService.setTitle(`${Title} | ${result.title}`);
          });
      });
  }

  getMoreDynamic() {
    this.apiService
      .getAPI(
        `page/${this.dynamicUrl}?limit=10&offset=${this.dynamicSecond.length + 1}`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.stories.forEach((element: any) => {
          this.dynamicSecond.push(element);
        });
      });
  }

  readMore(item: any) {
    return this.commonService.readMore1(item,'most-recent');
  }
  getMoreData() {
    this.apiService
      .getAPI(
        `1851/${this.slug}/most-recent?limit=10&offset=${this.mostRecent.length + 1}`
      )
      .subscribe((result) => {
        this.hasMore = result.has_more;
        result.data.forEach((element: any) => {
          this.mostRecent.push(element);
        });
      });
  }
  getMeta() {
    this.apiService.getAPI(`${this.slug}/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((result) => {
          this.metaService.setTitle(
            `${response.data.seo.title} | ${result.title}`
          );
        });
    });
  }
}
