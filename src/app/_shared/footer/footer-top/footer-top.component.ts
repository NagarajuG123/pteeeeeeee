import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-footer-top',
  templateUrl: './footer-top.component.html',
  styleUrls: ['./footer-top.component.scss'],
})
export class FooterTopComponent implements OnInit {
  footerData: any = [];
  publication: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const footer = this.apiService.getAPI(`1851/footer`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);

    forkJoin([footer, publication]).subscribe((results) => {
      this.footerData = results[0].data;
      this.publication = results[1];
    });
  }
}
