import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-latest-story',
  templateUrl: './latest-story.component.html',
  styleUrls: ['./latest-story.component.scss']
})
export class LatestStoryComponent implements OnInit {
  @Input() slug!: string;
  @Input() type!: string;
  @Input() title = '';
  @Input() isScroll: boolean = false;
  @Input() company = '';

  items: any;
  scrollOffset: number = 0;
  constructor(private apiService: ApiService,
  private commonService: CommonService) { }

  ngOnInit(): void {
    this.getLatestStory();
  }
 getMoreItem() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.items.length}`)
    .subscribe(result => {
      this.items = this.items.concat(result['data']);
      this.scrollOffset += 8;
    });
   }
  readMore(item: any) {
    return this.commonService.readMore(item, 'latest-story');
  }
  getLatestStory() {
    this.apiService.getAPI(`${this.slug}/brand-latest-stories?limit=8&offset=${this.scrollOffset}`).subscribe((response) => {
      this.items = response.data;
    });
  }
}
