import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ValidationService } from 'src/app/_core/services/validation.service';
@Component({
  selector: 'app-contacteditorial',
  templateUrl: './contacteditorial.component.html',
  styleUrls: ['./contacteditorial.component.scss'],
})
export class ContacteditorialComponent implements OnInit, AfterViewInit {
  data: any = [];
  slug = '1851';
  publication: any;
  submitErrMsg: string;
  submitSuccessMsg: string;
  isSubmitted: boolean = false;
  isBrowser: boolean;
  contactForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder
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
  }

  ngOnInit(): void {
    this.getContactEditorial();
    this.getMeta();
    this.getPublication();
  }

  getContactEditorial() {
    this.apiService
      .getAPI(`${this.slug}/contact-editorial`)
      .subscribe((response) => {
        this.data = response.data;
      });
  }
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((result) => {
          this.metaService.setTitle(`Contact Editorial | ${result.title}`);
        });
    });
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $('.sucess-message a').click(function (e) {
        $('.editors').show();
        $('.sucess-message').hide();
      });
    }
  }
  toggleCurrent(e) {
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
    if (!e.target.checked) {
      this.contactForm.controls['franchiseExecutive'].setValue('');
      this.contactForm.controls['franchiseExecutiveLeadership'].setValue('');
      this.contactForm.controls['franchiseNonExecutiveLeadership'].setValue('');
    }
    return;
  }

  toggleExecutive1(e) {
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
