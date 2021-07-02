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
  latestStories: any = [];
  company: string = '';
  scrollOffset: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.slug = params.get('brand_slug');
        this.apiService.getAPI(`get-brand-by-slug/${this.slug}`).subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.company = response.name;
            this.getLatestStory();
          }
        });
    });
  }

  getLatestStory() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.scrollOffset}`).subscribe((response) => {
      if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.latestStories = response;
          }
    });

  }
   getMoreItem() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.latestStories.data.length}`)
    .subscribe(result => {
      this.latestStories = this.latestStories.data.concat(result['data']);
      console.log(this.latestStories)
      this.scrollOffset += 8;
    });
  }
}
