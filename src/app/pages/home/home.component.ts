import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ApiService } from 'src/app/_core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_core/services/common.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newsletterForm!: FormGroup;
  isSubmitted: boolean = false;
  isLoaded: Boolean = false;
  isLoad: boolean = false;
  submitErrMsg = '';
  successMsg = '';
  schema: any;

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
    const meta = this.apiService.getAPI2(`meta`);
    forkJoin([meta]).subscribe((results) => {
      this.metaService.setSeo(results[0].data);
      this.isLoad = true;
      let socialLinks = [];
      this.commonService?.publication?.socialLinks.forEach((item:any)=>{
        socialLinks.push(item.url);
      });      this.schema = {
        '@context': 'https://schema.org/',
        '@type': 'MainSite',
        name: this.commonService?.publication?.title,
        url: this.commonService?.publication?.url,
        image: {
          '@type': 'ImageObject',
          url: this.commonService?.publication?.logo,
          width: 279,
          height: 279,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${environment.appUrl}`,
        },
        sameAs: socialLinks,
      };
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
  getTitle() {
    let title = 'Everything Franchising';
    if(this.commonService?.publication?.id == 'Stachecow') {
      title = 'EVERYTHING PERSONAL WEALTH AND FINANCE';
    }
    else if(this.commonService?.publication?.id == 'EE') {
      title = 'THE FUTURE OF REAL ESTATE';
    }
    else if(this.commonService?.publication?.id == 'ROOM-1903') {
      title = 'FOR THE LOVE OF TRAVEL';
    }
    return title;
  }
  getSubTitle() {
    let subTitle = 'To help you buy, grow and build';
    if(this.commonService.publication?.id == 'Stachecow') {
      subTitle = 'To help you build the life you deserve ';
    } else if (this.commonService.publication?.id == 'ROOM-1903') {
      subTitle = 'We believe all travelers deserve the inside secrets';
    }
    return subTitle;
  }
}
