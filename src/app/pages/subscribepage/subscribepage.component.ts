import { Component, OnInit } from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/five';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';

@Component({
  selector: 'app-subscribepage',
  templateUrl: './subscribepage.component.html',
  styleUrls: ['./subscribepage.component.scss'],
})
export class SubscribepageComponent implements OnInit {
  data: FiveColumn[] = [];
  slug = '1851';
  title!: string;
  isCheckBoxVisible: boolean = true;
  publication: any;
  constructor(
    private apiService: ApiService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.getSubscribe();
    this.getMeta();
    this.getPublication();
  }

  getSubscribe() {
    this.apiService.getAPI(`${this.slug}/subscribe`).subscribe((response) => {
      this.data = response;
      this.title = 'SUBSCRIBE TO 1851 FRANCHISE';
    });
  }
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
  setCheckBoxVisibility() {
    if (this.publication.id === '1851') {
      return;
    }
    this.isCheckBoxVisible = false;
  }
}
