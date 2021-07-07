import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  slug: any;
  type: string = '';
  latestStories: any = [];
  mostRecent: any = [];
  company: string = '';
  scrollOffset: number = 0;
  apiUrl: string = '';
  hasMore: boolean = false;
  categorySlug: any = '';
  mostRecentUrl: any;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private apiService: ApiService,
    private commonService: CommonService

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
              if (this.categorySlug != '') {
                this.apiUrl = `${this.slug}/${this.categorySlug}/featured`;
                this.mostRecentUrl = `${this.slug}/${this.categorySlug}/most-recent`;
              }
              this.getMostRecent();
            } else if (this.type === 'brand_page' && !this.categorySlug) {
              this.apiUrl = `${this.slug}/featured-articles`;
              this.getLatestStory();
            }
          }
        });
    });
  }

  getLatestStory() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.scrollOffset}`).subscribe((response) => {
      this.latestStories = response.data;
    });

  }
  getMostRecent() {
    this.apiService.getAPI(`${this.mostRecentUrl}?limit=10&offset=${this.scrollOffset}`).subscribe((response) => {
      this.mostRecent = response.data;
      this.hasMore = response.has_more;
    });
  }
   getMoreItem() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.latestStories.length}`)
    .subscribe(result => {
      this.latestStories = this.latestStories.concat(result['data']);
      this.scrollOffset += 8;
    });
   }
  readMore(item: any) {
    return this.commonService.readMore(item);
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
}
