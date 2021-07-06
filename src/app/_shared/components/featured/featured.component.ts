import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
    @Input() slug = '1851';

  featuredData: any = [];
  openVideoPlayer = false;
  highlight: any =[];

  constructor(private apiService: ApiService,
  private commonService: CommonService) { }

  ngOnInit(): void {
    this.getFeatured();
  }

  getFeatured() {
    this.apiService.getAPI(`${this.slug}/featured-articles?limit=10&offset=0`).subscribe((response ) =>{
      this.featuredData = response;
      if(response.data){
        this.highlight = response.data[0];
      }
    });
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
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
