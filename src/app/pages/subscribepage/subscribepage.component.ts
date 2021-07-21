import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
    this.setInit();
  }

  setInit() {
    const subscribe = this.apiService.getAPI(`${this.slug}/subscribe`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    const meta = this.apiService.getAPI(`1851/meta`);
    forkJoin([subscribe, publication, meta, publication]).subscribe(
      (results) => {
        this.data = results[0].data;
        this.title = 'SUBSCRIBE TO 1851 FRANCHISE';
        this.publication = results[1];
        this.metaService.setSeo(results[2].data);
        let defaultTitle = '';
        if (this.publication.id === '1851') {
          defaultTitle = `Subscribe to 1851 Franchise News | ${this.publication.title}`;
        }
        if (defaultTitle) {
          this.metaService.setTitle(defaultTitle);
        }
      }
    );
  }

  setCheckBoxVisibility() {
    if (this.publication.id === '1851') {
      return;
    }
    this.isCheckBoxVisible = false;
  }
}
