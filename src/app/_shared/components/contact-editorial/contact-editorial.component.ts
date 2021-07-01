import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-editorial',
  templateUrl: './contact-editorial.component.html',
  styleUrls: ['./contact-editorial.component.scss']
})
export class ContactEditorialComponent implements OnInit {
  @Input()
  isCheckBoxVisible!: boolean; 
  @Input()
  publicationTitle!: string;

  contactForm: FormGroup;
  isSubmitted: boolean | undefined;
  submitErrMsg: string | undefined;
  submitSuccessMsg: string | undefined;
  isSuccess: boolean | undefined;

  constructor( fb: FormBuilder, private apiService: ApiService) { this.contactForm = fb.group({
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
  });}

  ngOnInit(): void {
    this.isSubmitted = false;
    this.submitErrMsg = '';
    this.submitSuccessMsg = '';
    this.isSuccess = false;
    this.contactForm.reset({
      signUpNewsletter: true
    });
  }

  
  onContactSubmit(contactForm: FormGroup) {
    this.submitErrMsg = '';
    this.submitSuccessMsg = '';
    this.isSubmitted = true;
    this.isSuccess = false;
    if (!contactForm.valid) {
      return;
    }
    const subscribe_form = {
      'email' : this.contactForm.controls['email'].value,
      'currentFranchisee' : this.contactForm.controls['currentFranchisee'].value ? 1 : 0,
      'currentFranchiseeOwnsUp10units' : this.contactForm.controls['currentFranchiseeOwnsUp10units'].value ? 1 : 0,
      'currentFranchiseeOwns10Plusunits' : this.contactForm.controls['currentFranchiseeOwns10Plusunits'].value ? 1 : 0,
      'prospectiveFranchisee' : this.contactForm.controls['prospectiveFranchisee'].value ? 1 : 0,
      'prospectiveFranchiseeUnder6Months' : this.contactForm.controls['prospectiveFranchiseeUnder6Months'].value ? 1 : 0,
      'prospectiveFranchiseeOver6Months' : this.contactForm.controls['prospectiveFranchiseeOver6Months'].value ? 1 : 0,
      'franchiseExecutive' : this.contactForm.controls['franchiseExecutive'].value ? 1 : 0,
      'franchiseExecutiveLeadership' : this.contactForm.controls['franchiseExecutiveLeadership'].value ? 1 : 0,
      'franchiseNonExecutiveLeadership' : this.contactForm.controls['franchiseNonExecutiveLeadership'].value ? 1 : 0,
      'businessExecutive' : this.contactForm.controls['businessExecutive'].value ? 1 : 0,
      'businessExecutiveLeadership': this.contactForm.controls['businessExecutiveLeadership'].value ? 1 : 0,
      'businessNonExecutiveLeadership' : this.contactForm.controls['businessNonExecutiveLeadership'].value ? 1 : 0,
      'other' : this.contactForm.controls['other'].value ? 1 : 0,
      'signUpNewsletter' : this.contactForm.controls['signUpNewsletter'].value ? 1 : 0
    };

    this.apiService.postAPI('1851/subscribe', subscribe_form)
    .subscribe(result => {
      if (typeof result.data !== 'undefined') {
        this.submitSuccessMsg = result.data.message;
        this.isSuccess = true;
      } else {
        this.submitErrMsg = result.error.message;
        this.isSuccess = false;
      }
    });
  }
}


