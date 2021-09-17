import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { ValidationService } from 'src/app/_core/services/validation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  publication: any;
  @Input() data: any;
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  submitErrMsg: string = '';
  submitSuccessMsg: string = '';
  isBrowser: boolean;

  constructor(
    private apiService: ApiService,
    fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
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
  }

  ngOnInit(): void {
    this.getPublication();
  }

  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }

  toggleCurrent(e) {
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
  toggleProspective(e) {
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

  toggleExecutive(e) {
    $('.executive-details').slideToggle();
    if (!e.target.checked) {
      this.contactForm.controls['franchiseExecutive'].setValue('');
      this.contactForm.controls['franchiseExecutiveLeadership'].setValue('');
      this.contactForm.controls['franchiseNonExecutiveLeadership'].setValue('');
    }
    return;
  }

  toggleExecutive1(e) {
    $('.executive1-details').slideToggle();
    if (!e.target.checked) {
      this.contactForm.controls['businessExecutive'].setValue('');
      this.contactForm.controls['businessExecutiveLeadership'].setValue('');
      this.contactForm.controls['businessNonExecutiveLeadership'].setValue('');
    }
    return;
  }
  toggleOther(e) {
    if (!e.target.checked) {
      this.contactForm.controls['other'].setValue('');
    }
    return;
  }
  onContactSubmit(contactForm: FormGroup) {
    this.submitErrMsg = '';
    this.submitSuccessMsg = '';
    if (!contactForm.valid) {
      return;
    }
    this.isSubmitted = true;
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
          $('.editors').hide();
          $('.sucess-message').show();
          this.submitSuccessMsg = result.data.message;
        } else {
          this.submitErrMsg = result.error.message;
        }
      });
  }
}
