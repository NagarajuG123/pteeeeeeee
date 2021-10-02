import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ApiService } from 'src/app/_core/services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_core/services/common.service';

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
  submitErrMsg = '';
  successMsg = '';
  constructor(
    private metaService: MetaService,
    private apiService: ApiService,
    fb: FormBuilder,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.newsletterForm = fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getMeta();
    this.getPublication();
    this.commonService.isPageLoaded.subscribe((res) => {
      if(res){
        this.isLoaded = true;
      }
    })
  }
  //Publication Instance
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
