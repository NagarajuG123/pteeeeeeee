import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Publication } from 'src/app/_core/models/publication.model';
import { Aboutus } from 'src/app/_core/models/aboutus.model';

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

  bannerImageLoaded: Boolean = false;
  mainimageLoaded: Boolean = false;
  publication: Publication[] = [];
  contactForm!: FormGroup;
  isSubmitted: boolean = false;
  siteKey!: string;
  submitErrMsg!: string;
  submitSuccessMsg!: string;
  isBrowser!: boolean;
  data: Aboutus[] = [];
  showVideo: Boolean = false;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  
  constructor(
        private apiService: ApiService,
        private tstate: TransferState,
        @Inject(PLATFORM_ID) platformId: Object,
        fb: FormBuilder,
        private toastr: ToastrService) {
          this.isBrowser = isPlatformBrowser(platformId);
          this.contactForm = fb.group({
          first_name: ['', Validators.compose([Validators.required])],
          last_name: ['', Validators.compose([Validators.required])],
          email: [
            '',
            Validators.compose([
              Validators.required,
              // ValidationService.emailValidator,
            ]),
          ],
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
      this.publicationContents = aboutUsData['publicationContents']
    }
    else{
      const aboutUsData:any = {};
      const aboutus = this.apiService.getAPI(`1851/about-us`);
      const meta = this.apiService.getAPI(`1851/meta`);
      const publication = this.apiService.getAPI(`1851/publication-instance`);
      forkJoin([publication, aboutus, meta]).subscribe((results) => {
        aboutUsData['data'] = results[1].data;
        aboutUsData['publication'] = results[0];
        if (this.data?.contents?.length > 1) {
          for (let i = 1; i < aboutUsData['data'].contents.length; i++) {
            aboutUsData['publicationContents'].push(aboutUsData['data'].contents[i]);
          }
        }
        // this.metaService.setSeo(results[2].data);
        this.tstate.set(RESULT_KEY,aboutUsData);
      });
    }
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