import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() apiUrl!: string;
  constructor(private apiService: ApiService) {}

  data: Details[] = [];
  news: Details[] = []
  publication: any = [];
  slug: string = '1851';

  ngOnInit(): void {
    this.getPublication();
    this.getFeatured();
    this.getNews();
  }

  //Publication Instance
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }

  getFeatured(){
    this.apiService
    .getAPI(`${this.apiUrl}?limit=10&offset=0`)
    .subscribe((response) => {
      this.data = response.data;
    });
  }

  getNews(){
    this.apiService
    .getAPI(`1851/news?limit=10&offset=0`)
    .subscribe((response) => {
      this.news = response.data;
    });
    // if(this.tstate.hasKey(RESULT_KEY)){
    //   const newsData = this.tstate.get(RESULT_KEY,{});
    //   this.news = newsData['news'];
    // }
    // else{
    //   this.apiService
    //   .getAPI(`1851/news?limit=10&offset=0`)
    //   .subscribe((response) => {
    //     newsData['news'] = response.data;
    //   });
    //   this.tstate.set(RESULT_KEY, newsData);
    // } 
  }
}
