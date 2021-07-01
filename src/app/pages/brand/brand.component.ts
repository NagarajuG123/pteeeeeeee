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
  brandDetails: any;
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
          this.brandDetails = response;
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          }
    });
      });
  }
}
