import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  @Output() imageLoaded = new EventEmitter();
  publication_contents: any = [];
  loadedImageNum = 0;

  bannerImageLoaded: Boolean = false;
  mainimageLoaded: Boolean = false;
  publication: any = [];
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  siteKey: string;
  submitErrMsg: string;
  submitSuccessMsg: string;
  isBrowser: boolean;
  data: any = [];
  showVideo: Boolean = false;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.contactForm = fb.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
        ]),
      ],
      message: ['', Validators.compose([Validators.required])],
      reCaptchaCode: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.siteKey = environment.reCaptchaKey;

    const aboutus = this.apiService.getAPI(`1851/about-us`);
    const meta = this.apiService.getAPI(`1851/meta`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    forkJoin([publication, aboutus, meta]).subscribe((results) => {
      this.data = results[1].data;
      this.publication = results[0];
      if (this.data?.contents?.length > 1) {
        for (let i = 1; i < this.data.contents.length; i++) {
          this.publication_contents.push(this.data.contents[i]);
        }
      }
      this.metaService.setSeo(results[2].data);
    });
  }

  onModalHide() {
    this.showVideo = false;
  }

  bannerImageLoad() {
    this.bannerImageLoaded = true;
  }
  mainImageLoad() {
    this.mainimageLoaded = true;
  }
  onContactSubmit(contactForm: FormGroup) {
    this.submitErrMsg = '';
    this.submitSuccessMsg = '';
    this.isSubmitted = true;

    // if (!contactForm.valid) {
    //   return;
    // }
    this.apiService
      .postAPI('1851/about-us', contactForm.value)
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
          this.toastr.success(result.data.message, 'Thanks!');
          this.isSubmitted = false;
          this.resetForm();
        } else {
          this.submitErrMsg = result.error.message;
        }
      });
  }
  resetForm() {
    this.contactForm.patchValue({
      first_name: '',
      last_name: '',
      email: '',
      message: '',
      reCaptchaCode: '',
    });
  }
  resolved(event) {}

  handleReset() {}

  handleExpire() {}

  handleLoad() {}
}
