import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  slug:string;
  data:any;

  constructor(private route: ActivatedRoute,private apiService: ApiService, public commonService: CommonService,) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      this.route.queryParams.subscribe((queryParams) => {
        this.apiService
        .getAPI2(`widget?id=${queryParams.id}`)
        .subscribe(async (response) => {
          this.data = response;
        });
      })
    });

  }

}
