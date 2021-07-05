import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  author: any = [];
  authorSlug: any = '';
  editorials: any = [];
  brandedContents: any = [];
  constructor(private route: ActivatedRoute,
    private router:Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.authorSlug = params.get('authorSlug');
        this.apiService.getAPI(`author/${this.authorSlug}`).subscribe((response) => {
          if (response.data === '') {
            this.router.navigateByUrl('/404');
          } else {
            this.author = response;
            this.getBranded();
            this.getEditorials();
          }
      });
    });
  }
  getBranded() {
    this.apiService.getAPI(`author/${this.authorSlug}/branded-contents?limit=10&offset=0`).subscribe((response) => {
      this.brandedContents = response.data;
    });
  }
  getEditorials() {
    this.apiService.getAPI(`author/${this.authorSlug}/editorials?limit=10&offset=0`).subscribe((response) => {
      this.editorials = response.data;
    });
  }
}
