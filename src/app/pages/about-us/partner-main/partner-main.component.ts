import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-partner-main',
  templateUrl: './partner-main.component.html',
  styleUrls: ['./partner-main.component.scss'],
})
export class PartnerMainComponent implements OnInit {
  @Input() demo: Object = null;
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  siteKey: string;
  submitErrMsg: string;
  submitSuccessMsg: string;
  isBrowser: boolean;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  imageUrl: string;
  demoDescription: string;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder,
    private apiService: ApiService,
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
    this.imageUrl = '';
    this.demoDescription = '';
  }

  ngOnInit(): void {
    this.siteKey = environment.reCaptchaKey;
    this.imageUrl = _.get(this.demo, 'media.url', '');
    this.demoDescription = _.get(this.demo, 'description', '');
  }

  onContactSubmit(contactForm: FormGroup) {
    this.submitErrMsg = '';
    this.submitSuccessMsg = '';
    this.isSubmitted = true;

    // if (!contactForm.valid) {
    //   return;
    // }
    console.log(contactForm);
    this.apiService
      .postAPI('1851/about-us', contactForm.value)
      .pipe(takeUntil(this.onDestroy$))
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
