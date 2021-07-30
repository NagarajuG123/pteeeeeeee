import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/_core/services/meta.service';
import { forkJoin } from 'rxjs';
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
    private commonService: CommonService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.authorSlug = params.get('authorSlug');
      const author = this.apiService.getAPI(`author/${this.authorSlug}`);
      const publication = this.apiService.getAPI(`1851/publication-instance`);
      const brand = this.apiService.getAPI(
        `author/${this.authorSlug}/branded-contents?limit=10&offset=0`
      );
      const editorial = this.apiService.getAPI(
        `author/${this.authorSlug}/editorials?limit=10&offset=0`
      );
      const footer = this.apiService.getAPI('1851/footer');

      forkJoin([author, publication, brand, editorial, footer]).subscribe(
        (results) => {
          if (results[0].data === '') {
            this.router.navigateByUrl('/404');
          } else {
            this.author = results[0];
            this.metaService.setSeo(results[0].meta);
            this.metaService.setTitle(
              `${results[0].data.first_name} ${results[0].data.last_name} | ${results[1].title}`
            );
            this.brandedContents = results[2].data;
            this.editorials = results[3].data;
            this.footer = results[4].data;
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
                this.footer['learn-more']['social-media']['fb-url'],
                this.footer['learn-more']['social-media']['twitter-url'],
                this.footer['learn-more']['social-media']['instagram-url'],
                this.footer['learn-more']['social-media']['linkedin-url'],
              ],
            };
          }
        }
      );
    });
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
  readMore(item: any) {
    return this.commonService.readMore1(item,'brand-latest-stories');
  }
  goReadMore(item: any) {
    return this.commonService.readMore1(item, 'editorials');
  }
}
