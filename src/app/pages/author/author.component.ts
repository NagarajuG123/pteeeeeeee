import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  author: any = [];
  authorSlug: any = '';
  editorials: any = [];
  brandedContents: any = [];
  footer: any;
  schema: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.authorSlug = params.get('authorSlug');
      this.apiService
        .getAPI(`author/${this.authorSlug}`)
        .subscribe((response) => {
          if (response.data === '') {
            this.router.navigateByUrl('/404');
          } else {
            this.author = response;
            this.getBranded();
            this.getEditorials();
          }
        });
    });
    this.setSchema();
  }
  setSchema() {
    this.apiService.getAPI(`1851/footer`).subscribe((response) => {
      this.footer = response.data;
    });
    this.schema = {
      '@context': 'https://schema.org/',
      '@type': 'Person',
      name: `${this.author.data.first_name} ${this.author.data.last_name}`,
      url: `${environment.appUrl}${this.router.url}`,
      image: {
        '@type': 'ImageObject',
        url: this.getUserAvater(this.author.data.media),
        width: 279,
        height: 279,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${environment.appUrl}`,
      },
      sameAs: [
        this.footer.data['learn-more']['social-media']['fb-url'],
        this.footer.data['learn-more']['social-media']['twitter-url'],
        this.footer.data['learn-more']['social-media']['instagram-url'],
        this.footer.data['learn-more']['social-media']['linkedin-url'],
      ],
    };
  }
  getUserAvater(media: any) {
    if (typeof media === 'undefined' || media === null) {
      return `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/https://placeimg.com/279/279/any`;
    } else {
      return media.type === 'image'
        ? `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${media.url}`
        : `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${media.placeholder}`;
    }
  }
  getBranded() {
    this.apiService
      .getAPI(`author/${this.authorSlug}/branded-contents?limit=10&offset=0`)
      .subscribe((response) => {
        this.brandedContents = response.data;
      });
  }
  getEditorials() {
    this.apiService
      .getAPI(`author/${this.authorSlug}/editorials?limit=10&offset=0`)
      .subscribe((response) => {
        this.editorials = response.data;
      });
  }
  goReadMore(item: any) {
    return this.commonService.readMore(item, 'editorials');
  }
  readMore(item: any) {
    return this.commonService.readMore(item, 'brand-latest-stories');
  }
}
