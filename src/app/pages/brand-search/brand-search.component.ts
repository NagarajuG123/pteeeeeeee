import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.scss'],
})
export class BrandSearchComponent implements OnInit {
  searchForm!: FormGroup;
  bannerImage: string;
  search_input: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(''),
    });
    this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
      this.setBannerImage(result);
    });
  }
  setBannerImage(publication) {
    if (publication.id == '1851') {
      this.bannerImage = 'assets/img/banner_search_page.jpg';
    } else if (publication.id == 'EE') {
      this.bannerImage = 'assets/img/banner_search_ee.jpg';
    } else {
      this.bannerImage = 'assets/img/banner_search_page_1903.jpg';
    }
  }
  onSearchBannerSubmit(searchForm: FormGroup) {
    this.search_input = searchForm.controls['searchInput'].value;
  }
}
