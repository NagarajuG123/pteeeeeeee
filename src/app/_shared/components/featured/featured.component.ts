import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const RESULT_KEY = makeStateKey<any>('featureState');

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() apiUrl!: string;
  constructor(private apiService: ApiService,private tstate: TransferState) {}

  data: Details[] = [];
  news: Details[] = []
  slug: string = '1851';

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const featureData = this.tstate.get(RESULT_KEY, {});
      this.data = featureData['data'];
      this.news = featureData['news'];
    } else {
      const featureData:any = {}

      this.apiService
      .getAPI(`${this.apiUrl}?limit=10&offset=0`)
      .subscribe((response) => {
        featureData['data'] = response.data.slice(0,4);
      });
      this.apiService
      .getAPI(`1851/news?limit=10&offset=0`)
      .subscribe((response) => {
        featureData['news'] = response.data;
      });
      
    this.tstate.set(RESULT_KEY, featureData);
   }
  }
}
