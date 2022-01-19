import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/_core/services/meta.service';
import { forkJoin } from 'rxjs';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'lazysizes';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
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
  faAngleRight = faAngleRight;
  socialIcons: any = [
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedinIn,
    faYoutube,
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
      const author = this.apiService.getAPI(`author/${this.authorSlug}`);
      const publication = this.apiService.getAPI(`1851/publication-instance`);
      const brand = this.apiService.getAPI(
        `author/${this.authorSlug}/branded-contents?limit=10&offset=0`
      );
      const editorial = this.apiService.getAPI(
        `author/${this.authorSlug}/editorials?limit=10&offset=0`
      );
      const footer = this.apiService.getAPI2('footer');

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
            this.footer = results[4];
            let socialLinks = [];
            this.footer.socialMedia.forEach((item:any)=>{
              socialLinks.push(item.url);
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
