import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnChanges {
  @Input() slug = '1851';
  @Input() apiUrl!: any;

  featuredData: any = [];
  highlight: any =[];

  constructor(private apiService: ApiService,
  private commonService: CommonService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.apiUrl = changes.apiUrl.currentValue;
    this.getFeatured();
    }
  getFeatured() {
    this.apiService.getAPI(`${this.apiUrl}?limit=10&offset=0`).subscribe((response ) =>{
      this.featuredData = response;
      if(response.data){
        this.highlight = response.data[0];
      }
    });
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  isVideo(item: any) {
    return this.commonService.isVideo(item);
  }
  
}
