import {
  Component,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss'],
})
export class BannerSearchComponent implements OnInit {
  @Input('searchInput') searchInput!: string;
  @Output() onSearch = new EventEmitter<boolean>();

  searchForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const searchInput: SimpleChange = changes.searchInput;
    if (searchInput.currentValue !== '') {
      setTimeout(() => {
        this.searchForm.controls['searchInput'].setValue(
          searchInput.currentValue
        );
      }, 500);
    }
  }

  onSearchSubmit(searchForm: FormGroup) {
    this.onSearch.emit(searchForm.controls['searchInput'].value);
  }
}
