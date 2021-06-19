import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
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
