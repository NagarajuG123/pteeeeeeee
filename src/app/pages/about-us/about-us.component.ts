import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Publication } from 'src/app/_core/models/publication.model';
import { Aboutus } from 'src/app/_core/models/aboutus.model';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { Meta } from 'src/app/_core/models/meta.model';
import { MetaService } from 'src/app/_core/services/meta.service';

const RESULT_KEY = makeStateKey<any>('aboutusstate');

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @Output() imageLoaded = new EventEmitter();
  publicationContents: any = [];
  loadedImageNum = 0;
  openVideoPlayer: boolean = true;
  metaData: Meta[] = [];

  bannerImageLoaded: Boolean = false;
  mainimageLoaded: Boolean = false;
  publication: Publication[] = [];
  contactForm!: FormGroup;
  isSubmitted: boolean = false;
  siteKey!: string;
  submitErrMsg!: string;
  submitSuccessMsg!: string;
  isBrowser!: boolean;
  data: any = [];
  showVideo: Boolean = false;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  
  constructor(
        private apiService: ApiService,
        private tstate: TransferState,
        private control: FormControl,
        private metaService: MetaService,
        @Inject(PLATFORM_ID) platformId: Object,
        fb: FormBuilder,
        private toastr: ToastrService) {
          this.isBrowser = isPlatformBrowser(platformId);
          this.contactForm = fb.group({
          first_name: ['', Validators.compose([Validators.required])],
          last_name: ['', Validators.compose([Validators.required])],
          message: ['', Validators.compose([Validators.required])],
          reCaptchaCode: ['', Validators.compose([Validators.required])],
        });
         }

  ngOnInit(): void {
    this.siteKey = environment.reCaptchaKey;
    if(this.tstate.hasKey(RESULT_KEY)){
      const aboutUsData = this.tstate.get(RESULT_KEY,{});
      this.data = aboutUsData['data'];
      this.publication = aboutUsData['publication']; 
      this.publicationContents = aboutUsData['publicationContents'];
      this.metaData = aboutUsData['meta'];
      this.metaService.setSeo(this.metaData);
    }
    else{
      const aboutUsData:any = {};
      
      const publication = this.apiService.getAPI(`1851/publication-instance`);
      const aboutus = this.apiService.getAPI(`1851/about-us`);
      const meta = this.apiService.getAPI(`1851/meta`);

      forkJoin([publication, aboutus, meta]).subscribe((results) => {
        aboutUsData['publication'] = results[0];
        aboutUsData['data'] = results[1].data;
        aboutUsData['meta'] = results[2].data;
        if (this.data?.contents?.length > 1) {
          for (let i = 1; i < aboutUsData['data'].contents.length; i++) {
            aboutUsData['publicationContents'].push(aboutUsData['data'].contents[i]);
          }
        }
        this.metaService.setSeo( aboutUsData['meta']);
        this.tstate.set(RESULT_KEY,aboutUsData);
      });
    }
  }

  get errorMessage() {
    if (this.control && this.control.errors) {
      for (const prop in this.control.errors) {
        if (this.control.errors.hasOwnProperty(prop)) {
          return ValidationService.getValidatorErrorMessage(prop);
        }
      }
    }
    return null;
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
  resolved(event:any) {}

  handleReset() {}

  handleExpire() {}

  handleLoad() {}
}