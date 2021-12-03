import { Component, OnInit } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  data: Details[] = [];
  title: string;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAPI(`home-page-featured-content`).subscribe((result) => {
      this.data = result.data.stories;
      this.title = result.data.title;
    });
  }
}
