import { Component, OnInit } from '@angular/core';
import { ApiService  } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  brandInfo: any = [];
  contents: any;
  brandSlug: any;

  constructor(private apiService: ApiService,private route: ActivatedRoute,private router:Router,) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.brandSlug = params.get('brandSlug');
        this.apiService.getAPI(`get-brand-by-slug/${this.brandSlug}`).subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.apiService.getAPI(`${this.brandSlug}/brand-view`).subscribe((response) => {
              this.brandInfo = response.data;
            });
            this.getContents(params.get('item'));
          }
        });
      });
  }
  getContents(item: string | null) {
    let path;
    if (item === 'info') {
      path = 'brand-info';
    }
    this.apiService.getAPI(`${this.brandSlug}/${path}`).subscribe((response) => {
      this.contents = response;
    });
  }

}
