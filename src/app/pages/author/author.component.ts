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
      console.log(this.authorSlug)


      const author = this.apiService.getAPI2(`author?name=${this.authorSlug}`);
      const brand = this.apiService.getAPI2(`articles/author?limit=10&page=1&slug=${this.authorSlug}&type=branded-content`);
      const editorial = this.apiService.getAPI2(`articles/author?limit=10&page=1&slug=${this.authorSlug}&type=editorial`);
      const meta = this.apiService.getAPI2(`meta`);
      const footer = this.apiService.getAPI2('footer');

      forkJoin([author, brand, editorial, footer,meta]).subscribe(
        (results) => {
          if (results[0].status == false) {
            this.router.navigateByUrl('/404');
          } 
            this.author = results[0];
            this.metaService.setSeo(results[4].data.seo);
            this.metaService.setTitle(
              `${results[0].first_name} ${results[0].last_name} | ${this.commonService.publication.title}`
            );
            this.brandedContents = results[1].data;
            this.editorials = results[2].data;
            this.footer = results[3];
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
                url: this.getUserAvater(this.author.data?.media),
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
      );
    });
  }
  getUserAvater(media: any) {
       return `${environment.imageResizeUrl}/fit-in/500x261/${media?.path}`;
    }
}
