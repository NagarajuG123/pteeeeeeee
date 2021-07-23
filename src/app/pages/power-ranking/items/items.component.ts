import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() items: any;

  constructor() {}

  ngOnInit(): void {}

  goDetailPage(brandSlug: string, storySlug) {
    return `${brandSlug}/${storySlug}#brand-latest-stories`;
  }
}
