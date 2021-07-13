import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.scss']
})
export class BrandSearchComponent implements OnInit {
  search_input: string;

  constructor() { }

  ngOnInit(): void {
    this.search_input = '';
  }

  updateSearchInput(input) {
    this.search_input = input;
  }
}
