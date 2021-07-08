import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() details: any;
  @Input() publication: any;
  isViewComment: boolean = false;
  publishDate: Date | undefined;
  sponsorContent: boolean = false;
  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.setSponsorContent();
  }
 
  ngOnChanges(changes: SimpleChanges) {
    if (changes.details?.currentValue) {
      this.details = changes.details.currentValue;
      this.publishDate = new Date(this.details.posted_on.replace(/-/g, '/'));
    }
  }
  setSponsorContent() {
    this.apiService.getAPI(`terms`)
      .subscribe(result => {
        
      if (typeof result !== 'undefined' &&  result.data !== null) {
          result.data.forEach((brand: string) => {
            if (brand !== '' && brand !== null) {
              let brandRegex = new RegExp(brand);
              if (brandRegex.test(this.details.content)) {
                this.sponsorContent = true;
                // this.publishDate = new Date(this.details.posted_on.replace(/-/g, '/'));
              }
            }
          });
        }
    });
  }
  isVideo(item: any) {
    return this.commonService.isVideo(item);
  }
  }
