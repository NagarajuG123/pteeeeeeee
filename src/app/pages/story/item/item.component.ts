import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() details: any;
  @Input() publication: any;
  publishDate: Date | undefined;
  sponsorContent: boolean = false;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.setSponsorContent();
  }
 
  setSponsorContent() {
    this.apiService.getAPI(`terms`)
      .subscribe(result => {
        
      if (typeof result !== 'undefined' &&  result.data !== null) {
          result.data.forEach((brand: string) => {
            if (brand !== '' && brand !== null) {
              let brandRegex = new RegExp(brand);
              if (brandRegex.test(this.details.content)) {
                this.sponsorContent = true;
                this.publishDate = new Date(this.details.posted_on.replace(/-/g, '/'));
              }
            }
          });
        }
    });
  }
}
