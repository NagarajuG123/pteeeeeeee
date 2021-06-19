import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  featuredData: any = [];
  openVideoPlayer = false;
  highlight: any =[];

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFeatured();
  }

  getFeatured() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/featured-articles`).subscribe((response ) =>{
      this.featuredData = response;
      if(response['data']){
        this.featuredData['highlight'] = response['data'][0];
      }
      this.highlight = this.featuredData['highlight'];
    });
  }
  isVideo(item: { media: { type: string; } | null; } | null) {
    if (typeof item !== 'undefined' && item !== null) {
      if (typeof item.media !== 'undefined' && item.media !== null) {
        if (item.media.type === 'video') {
          return true;
        }
      }
    }
    return false;
  }

}
