import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-five-column-article',
  templateUrl: './five-column-article.component.html',
  styleUrls: ['./five-column-article.component.scss']
})
export class FiveColumnArticleComponent implements OnInit {
  columnData: any =[];
  videoData: any = [];
  slug: string = '1851';

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getColumns();
    this.getVideos();
  }

  getColumns() {
    this.apiService.getAPI(`${this.slug}/columns?limit=10&offset=0`).subscribe((response ) =>{
      this.columnData = response;
    });
  }

  getVideos() {
    this.apiService.getAPI(`${this.slug}/videos?limit=10&offset=0`).subscribe((response ) =>{
      this.videoData = response;
    });
  }
}
