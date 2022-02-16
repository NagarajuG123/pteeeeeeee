import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/_core/services/common.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  s3Url = environment.s3Url;
  constructor(
    private metaService: MetaService,
    private apiService: ApiService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
}
