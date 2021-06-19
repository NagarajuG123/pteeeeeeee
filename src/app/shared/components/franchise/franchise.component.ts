import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {
  newsData: any = [];
  slug: string = '1851';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.apiService.getAPI(`${this.slug}/news`).subscribe((response ) =>{
      this.newsData = response;
    });
  }

}
