import { Component, OnInit, Output, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss']
})
export class BannerSearchComponent implements OnInit {
  @Input('search_input') search_input!: string;
  @Output() onSearch = new EventEmitter<boolean>();

  searchForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search_input: new FormControl(''),
   });
  }

  ngOnChanges(changes: SimpleChanges) {
    const search_input: SimpleChange = changes.search_input;
    if (search_input.currentValue !== '') {
      setTimeout(() => {
        this.searchForm.controls['search_input'].setValue(search_input.currentValue);
      }, 500);
    }
  }

   onSearchSubmit(searchForm: FormGroup) {
    this.onSearch.emit(searchForm.controls['search_input'].value);
  }

}