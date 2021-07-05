import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  slug: any;
  type: string = '';
  latestStories: any = [];
  company: string = '';
  scrollOffset: number = 0;
  apiUrl: string = '';
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.slug = params.get('brandSlug');
        this.apiService.getAPI(`get-brand-by-slug/${this.slug}`).subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.type = response.type;
            if (this.type === 'category_page') {
              this.apiUrl = ``
            } else if (this.type === 'brand_page') {
              this.company = response.name;
              this.getLatestStory();
            }
          }
        });
    });
  }

  getLatestStory() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.scrollOffset}`).subscribe((response) => {
      if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.latestStories = response.data;
          }
    });

  }
   getMoreItem() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.latestStories.length}`)
    .subscribe(result => {
      this.latestStories = this.latestStories.concat(result['data']);
      this.scrollOffset += 8;
    });
  }
}
