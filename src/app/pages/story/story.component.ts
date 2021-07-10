import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  storyData: any = [];
  adsData: any = [];
  newsData: any = [];
  publication: any;
  storySlug: any = "";
  slug: any;
  storyId: any;
  customOptions: OwlOptions = {};

  constructor(private apiService: ApiService,
    private router:Router,
    private route: ActivatedRoute,
    private metaService:MetaService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( params => {
        this.slug = params.get('brandSlug');
        this.storySlug = params.get('storySlug');
        this.storyId = this.storySlug.slice(this.storySlug.lastIndexOf('-') + 1, this.storySlug.length);
        this.getStory();
        this.getAds();
        this.getNews();
        this.getPublication();
      });
    //ads config
    this.customOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
     autoplay: true,
    navText: [
      '',
      '',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  }

  getStory() {
    this.apiService.getAPI(`${this.slug}/story/${this.storyId}`).subscribe((response) => {
      if (response.data === "") {
        this.router.navigateByUrl('/404');
      } else {
        this.storyData = response.data;
        this.metaService.setSeo(response.meta);
      }
    });
  }
  getAds() {
    this.apiService.getAPI(`${this.slug}/ads`).subscribe((result) => {
       result.data.forEach( (ads: { type: string; }) => {
            if (ads.type === 'Story Ad' || ads.type === 'story_ad') {
              this.adsData.push(ads);
            }
       });
    });
  }
  getNews() {
    this.apiService.getAPI(`${this.slug}/news?limit=10&offset=0`).subscribe((result) => {
      this.newsData = result.data;
    });
  }
   getPublication() {
    this.apiService.getAPI(`1851/publication-instance`).subscribe((response ) =>{
      this.publication = response;
    });
  }
}
