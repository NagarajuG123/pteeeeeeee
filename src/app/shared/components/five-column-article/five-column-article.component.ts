import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-five-column-article',
  templateUrl: './five-column-article.component.html',
  styleUrls: ['./five-column-article.component.scss']
})
export class FiveColumnArticleComponent implements OnInit {
  columnData: any =[];
  videoData: any = [];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getColumns();
    this.getVideos();
  }

  getColumns() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/columns`).subscribe((response ) =>{
      this.columnData = response;
    });
  }

  getVideos() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/videos`).subscribe((response ) =>{
      this.videoData = response;
    });
  }
}
