import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { Meta } from 'src/app/_core/models/meta.model';
import { MetaService } from 'src/app/_core/services/meta.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-contacteditorial',
  templateUrl: './contacteditorial.component.html',
  styleUrls: ['./contacteditorial.component.scss'],
})
export class ContacteditorialComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted: boolean;
  submitErrMsg: string = '';
  submitSuccessMsg: string = '';
  data: any = [];
  isBrowser: boolean;
  isServer: boolean;
  control!: FormControl;
  metaData: Meta[] = [];
  s3Url = environment.s3Url;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder,
    public commonService: CommonService

  ) {
    this.contactForm = fb.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      message: [''],
      currentFranchisee: [''],
      currentFranchiseeOwnsUp10units: [''],
      currentFranchiseeOwns10Plusunits: [''],
      prospectiveFranchisee: [''],
      prospectiveFranchiseeUnder6Months: [''],
      prospectiveFranchiseeOver6Months: [''],
      franchiseExecutive: [''],
      franchiseExecutiveLeadership: [''],
      franchiseNonExecutiveLeadership: [''],
      businessExecutive: [''],
      businessExecutiveLeadership: [''],
      businessNonExecutiveLeadership: [''],
      other: [''],
    });
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    const contactApi = this.apiService.getAPI2('contact');
    const metaApi = this.apiService.getAPI2(`meta`);

    forkJoin([contactApi,  metaApi])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        this.data = response[0];
        this.metaData = response[1].data;
        this.metaService.setSeo(this.metaData);
        this.metaService.setTitle(
          `Contact Editorial | ${this.commonService.publication.title.toUpperCase()}`
        );
      });
  }

  toggleCurrent(e: any) {
    $('.current-details').slideToggle();
    if (!e.target.checked) {
      this.contactForm.controls['currentFranchisee'].setValue('');
      this.contactForm.controls['currentFranchiseeOwnsUp10units'].setValue('');
      this.contactForm.controls['currentFranchiseeOwns10Plusunits'].setValue(
        ''
      );
    }
    return;
  }
  toggleProspective(e: any) {
    $('.prospective-details').slideToggle();
    if (!e.target.checked) {
      this.contactForm.controls['prospectiveFranchisee'].setValue('');
      this.contactForm.controls['prospectiveFranchiseeUnder6Months'].setValue(
        ''
      );
      this.contactForm.controls['prospectiveFranchiseeOver6Months'].setValue(
        ''
      );
    }
    return;
  }

  toggleExecutive(e: any) {
    $('.executive-details').slideToggle();
    if (!e.target.checked) {
      this.contactForm.controls['franchiseExecutive'].setValue('');
      this.contactForm.controls['franchiseExecutiveLeadership'].setValue('');
      this.contactForm.controls['franchiseNonExecutiveLeadership'].setValue('');
    }
    return;
  }

  toggleExecutive1(e: any) {
    $('.executive1-details').slideToggle();
    if (!e.target.checked) {
      this.contactForm.controls['businessExecutive'].setValue('');
      this.contactForm.controls['businessExecutiveLeadership'].setValue('');
      this.contactForm.controls['businessNonExecutiveLeadership'].setValue('');
    }
    return;
  }
  toggleOther(e: any) {
    if (!e.target.checked) {
      this.contactForm.controls['other'].setValue('');
    }
    return;
  }
  onContactSubmit(contactForm: FormGroup) {
    this.isSubmitted = true;

    if (!contactForm.valid) {
      return;
    }

    const subscribe_form = {
      email: this.contactForm.controls['email'].value,
      first_name: this.contactForm.controls['first_name'].value,
      last_name: this.contactForm.controls['last_name'].value,
      message: this.contactForm.controls['message'].value,
      currentFranchisee: this.contactForm.controls['currentFranchisee'].value
        ? 1
        : 0,
      currentFranchiseeOwnsUp10units: this.contactForm.controls[
        'currentFranchiseeOwnsUp10units'
      ].value
        ? 1
        : 0,
      currentFranchiseeOwns10Plusunits: this.contactForm.controls[
        'currentFranchiseeOwns10Plusunits'
      ].value
        ? 1
        : 0,
      prospectiveFranchisee: this.contactForm.controls['prospectiveFranchisee']
        .value
        ? 1
        : 0,
      prospectiveFranchiseeUnder6Months: this.contactForm.controls[
        'prospectiveFranchiseeUnder6Months'
      ].value
        ? 1
        : 0,
      prospectiveFranchiseeOver6Months: this.contactForm.controls[
        'prospectiveFranchiseeOver6Months'
      ].value
        ? 1
        : 0,
      franchiseExecutive: this.contactForm.controls['franchiseExecutive'].value
        ? 1
        : 0,
      franchiseExecutiveLeadership: this.contactForm.controls[
        'franchiseExecutiveLeadership'
      ].value
        ? 1
        : 0,
      franchiseNonExecutiveLeadership: this.contactForm.controls[
        'franchiseNonExecutiveLeadership'
      ].value
        ? 1
        : 0,
      businessExecutive: this.contactForm.controls['businessExecutive'].value
        ? 1
        : 0,
      businessExecutiveLeadership: this.contactForm.controls[
        'businessExecutiveLeadership'
      ].value
        ? 1
        : 0,
      businessNonExecutiveLeadership: this.contactForm.controls[
        'businessNonExecutiveLeadership'
      ].value
        ? 1
        : 0,
      other: this.contactForm.controls['other'].value ? 1 : 0,
    };
    this.apiService
      .postAPI('1851/contact-editorial', subscribe_form)
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
          this.isSubmitted = false;
          $('.editors').hide();
          $('.sucess-message').show();
          this.submitSuccessMsg = result.data.message;
        } else {
          this.submitErrMsg = result.error.message;
        }
      });
  }
}
