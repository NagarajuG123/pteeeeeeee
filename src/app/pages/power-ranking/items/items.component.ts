import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() items:any;

  constructor() { }

  ngOnInit(): void {
  }
  goBrandPage(slug: string) {
    return slug;
  }

  goBrandInfoPage(slug: string) {
    return `${slug}/info`;
  }

}
