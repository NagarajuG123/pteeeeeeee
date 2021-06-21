import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videoData: any =[];

  constructor( private apiService:ApiService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/videos`).subscribe((response ) =>{
      this.videoData = response;
    });
  }
}
