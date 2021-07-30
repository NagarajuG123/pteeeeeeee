import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss'],
})
export class HomeFeatureComponent implements OnInit {
  franchiseData: any = [];
  highlightItem: any = [];
  item: any;
  constructor(
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getFranchise();
  }

  getFranchise() {
    this.apiService
      .getAPI(`home-page-featured-content`)
      .subscribe((response) => {
        this.item = response;
        if (response.data.stories.length > 0) {
          this.highlightItem = response.data.stories[0];
          this.franchiseData = response.data.stories.slice(1, 6);
        }
      });
  }

  readMore(item: any) {
    return this.commonService.readMore1(item,'dynamicpage');
  }
}
