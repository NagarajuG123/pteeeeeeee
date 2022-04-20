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
  socialIcons: any = [
    "fa fa-facebook-f",
    "fa fa-instagram",
    "fa fa-linkedin",
    "fa fa-youtube-play",
    "fa fa-twitter",
    "fa fa-globe",
  ];
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.authorSlug = params.get('authorSlug');
      const author = this.apiService.getAPI2(`author/${this.authorSlug}`);
      const publication = this.apiService.getAPI2(`publication`);
      const brand = this.apiService.getAPI(
        `author/${this.authorSlug}/branded-contents?limit=10&offset=0`
      );
      const editorial = this.apiService.getAPI(
        `author/${this.authorSlug}/editorials?limit=10&offset=0`
      );
      const meta = this.apiService.getAPI2(`meta`);
      const footer = this.apiService.getAPI2('footer');

      forkJoin([author, publication, brand, editorial, footer,meta]).subscribe(
        (results) => {
          if (results[0]=== '') {
            this.router.navigateByUrl('/404');
          } else {
            this.author = results[0];
            this.metaService.setSeo(results[5].data.seo);
            this.metaService.setTitle(
              `${results[0].first_name} ${results[0].last_name} | ${results[1].title}`
            );
            this.brandedContents = results[2].data;
            this.editorials = results[3].data;
            this.footer = results[4];
            let socialLinks = [];
            this.footer.socialMedia.forEach((item:any)=>{
              socialLinks.push(item.url);
            });
            this.schema = {
              '@context': 'https://schema.org/',
              '@type': 'Person',
              name: `${this.author.first_name} ${this.author.last_name}`,
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
                socialLinks
              ],
            };
          }
        }
      );
    });
  }
  getUserAvater(media: any) {
       return `${environment.imageResizeUrl}/fit-in/500x261/${media.path}`;
    }
}
