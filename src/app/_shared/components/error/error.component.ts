import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      // this.metaService.setSeo(response.data);
    });
  }

}
