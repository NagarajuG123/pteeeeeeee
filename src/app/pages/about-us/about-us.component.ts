import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { environment } from 'src/environments/environment';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'lazysizes';
import { CommonService } from 'src/app/_core/services/common.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  faAngleRight = faAngleRight;
  siteKey: string = environment.reCaptchaKey;

  publicationContents: any = [];
  publication: any = [];
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  submitErrMsg: string = '';
  submitSuccessMsg: string = '';
  isBrowser: boolean;
  data: any = [];
  videoUrl;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    private recaptchaV3Service: ReCaptchaV3Service,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    public commonService: CommonService
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
    const aboutus = this.apiService.getAPI(`1851/about-us`);
    const meta = this.apiService.getAPI(`1851/meta`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    forkJoin([publication, aboutus, meta]).subscribe((results) => {
      this.data = results[1].data;
      this.videoUrl = this.data.media.url;

      this.publication = results[0];
      if (this.data?.contents?.length > 1) {
        for (let i = 1; i < this.data.contents.length; i++) {
          this.publicationContents.push(this.data.contents[i]);
        }
      }
      this.metaService.setSeo(results[2].data);
    });
    this.recaptchaV3Service.execute('recaptcha')
    .subscribe((token: string) => {
      this.contactForm.controls.reCaptchaCode.setValue(token);
    });
  }

  isShow() {
    return this.publication.id == '1851';
  }

  onContactSubmit(contactForm: FormGroup) {
    this.isSubmitted = true;
    if (!contactForm.valid) {
      return;
    }
    this.apiService
      .postAPI('1851/about-us', contactForm.value)
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
          this.isSubmitted = false;
          this.submitSuccessMsg = result.data.message;
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
  ngAfterViewInit(){
    if(this.isBrowser){
      $('.modal').on('hidden.bs.modal', function(){
        $('.modal').hide();
        $('.modal iframe').attr("src", jQuery(".modal iframe").attr("src"));
      });
    }
  }
}
