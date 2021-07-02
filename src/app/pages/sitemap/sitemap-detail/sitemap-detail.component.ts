import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sitemap } from 'src/app/_core/models/sitemap';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-sitemap-detail',
  templateUrl: './sitemap-detail.component.html',
  styleUrls: ['./sitemap-detail.component.scss']
})
export class SitemapDetailComponent implements OnInit {
  sitemap: Sitemap[] = [];
  year!: any;
  month!: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params => {
       this.year = params.get('year');
       this.month = params.get('month');
      console.log(this.year);
      this.apiService.getAPI(`sitemap-page/${this.year}/${this.month}`).subscribe((response) => {
        this.sitemap = response;
        console.log(this.sitemap);
        if (response.status === 404) {
          this.router.navigateByUrl('/404');
        }
      });
    });
  }

}
