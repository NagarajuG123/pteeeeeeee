import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ApiService } from 'src/app/_core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_core/services/common.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  publication: any = [];
  newsletterForm!: FormGroup;
  isSubmitted: boolean = false;
  isLoaded: Boolean = false;
  isLoad: boolean = false;
  submitErrMsg = '';
  successMsg = '';
  constructor(
    private metaService: MetaService,
    private apiService: ApiService,
    fb: FormBuilder,
    public commonService: CommonService
  ) {
    this.newsletterForm = fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    const meta = this.apiService.getAPI2(`meta`);
    const featureData = this.apiService.getAPI(`home-page-featured-content`);
    forkJoin([publication, meta, featureData]).subscribe((results) => {
      this.publication = results[0];
      this.metaService.setSeo(results[1].data);
      this.isLoad = true;
    });

    this.commonService.isPageLoaded.subscribe((res) => {
      if (res) {
        this.isLoaded = true;
      }
    });
  }

  onNewsletterSubmit(newsletterForm: FormGroup) {
    this.isSubmitted = true;

    if (!newsletterForm.valid) {
      return;
    }
    const subscribeForm = {
      email: this.newsletterForm.controls['email'].value,
      name: this.newsletterForm.controls['name'].value,
    };
    this.apiService.postAPI('newsletter', subscribeForm).subscribe((result) => {
      if (typeof result.data !== 'undefined') {
        this.isSubmitted = false;
        this.successMsg = result.data.message;
        this.resetForm();
      } else {
        this.submitErrMsg = result.error.message;
      }
    });
  }
  resetForm() {
    this.newsletterForm.patchValue({
      name: '',
      email: '',
    });
  }
}
