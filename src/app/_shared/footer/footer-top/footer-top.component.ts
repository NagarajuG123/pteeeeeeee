import { Component, OnInit } from '@angular/core';
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
    this.getFooter();
    this.getPublication();
  }

  // Footer API
  getFooter() {
    this.apiService.getAPI(`1851/footer`).subscribe((response) => {
      this.footerData = response;
    });
  }

  //Publication Instance
  getPublication() {
    let slug = '1851';
    this.apiService
      .getAPI(`${slug}/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
}
