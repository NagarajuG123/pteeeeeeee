import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { environment } from 'src/environments/environment';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-partner-main',
  templateUrl: './partner-main.component.html',
  styleUrls: ['./partner-main.component.scss'],
})
export class PartnerMainComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  contactForm: FormGroup;
  isSubmitted: boolean;
  siteKey: string;
  submitErrMsg: string;
  submitSuccessMsg: string;
  constructor(fb: FormBuilder, private apiService: ApiService) {
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
  }

  onContactSubmit(contactForm: FormGroup) {
    this.submitErrMsg = '';
    this.submitSuccessMsg = '';
    this.isSubmitted = true;
    if (!contactForm.valid) {
      return;
    }
    this.apiService
      .postAPI('1851/about-us', contactForm.value)
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
          this.submitSuccessMsg = result.data.message;
          this.isSubmitted = false;
          this.resetForm();
        } else {
          this.submitErrMsg = result.error.message;
          this.captchaElem.resetCaptcha();
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
    this.captchaElem.resetCaptcha();
  }
  resolved(event) {}

  handleReset() {}

  handleExpire() {}

  handleLoad() {}
}
