import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {
  newsData: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    let slug='1851';
    this.apiService.getAPI(`${slug}/news`).subscribe((response ) =>{
      this.newsData = response;
    });
  }

}
