import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-info-bottom',
  templateUrl: './info-bottom.component.html',
  styleUrls: ['./info-bottom.component.scss']
})
export class InfoBottomComponent implements OnInit {
  @Input() brandSlug!: string;
  @Input() brandInfo!: any;
  @Input() items!: any;

  categories: any = [];
  selectedIndex: number = 0;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.brandInfo)
     this.categories = [
      {name: 'BRAND INFO', value: 'info'},
      {name: 'DOWNLOAD BRAND PDF', value: 'brand_pdf'},
      {name: 'LATEST STORIES', value: 'latest_stories'},
      {name: 'Why I BOUGHT', value: 'why-i-bought'},
      {name: 'EXECUTIVE Q&A', value: 'executive'},
      {name: 'AVAILABLE MARKETS', value: 'available-markets'},
    ];
  }
 isVideo(item: any) {
    return this.commonService.isVideo(item);
  }
}
