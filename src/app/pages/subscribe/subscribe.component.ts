import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { faAngleLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'lazysizes';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
  data: any;
  slug = '1851';
  title!: string;
  isCheckBoxVisible: boolean = true;
  publication: any;
  isBrowser: boolean = false;
  contactForm: FormGroup;
  isSubmitted: boolean;
  submitErrMsg: string = '';
  submitSuccessMsg: string = '';
  isSuccess: boolean = false;
  faAngleLeft = faAngleLeft;
  faCaretRight = faCaretRight;
  isLoaded: boolean = false;
  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.contactForm = fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
        ]),
      ],
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
      signUpNewsletter: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.acceptValidator,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.setInit();
  }

  setInit() {
    this.contactForm.reset({
      signUpNewsletter: true,
    });
    const subscribe = this.apiService.getAPI(`${this.slug}/subscribe`);
    const publication = this.apiService.getAPI(`1851/publication-instance`);
    const meta = this.apiService.getAPI(`1851/meta`);
    forkJoin([subscribe, publication, meta, publication]).subscribe(
      (results) => {
        this.data = results[0].data;
        this.publication = results[1];
        this.metaService.setSeo(results[2].data);
        this.isLoaded = true;
        let defaultTitle = '';
        if (this.publication.id === '1851') {
          defaultTitle = `Subscribe to 1851 Franchise News | ${this.publication.title}`;
        }
        if (defaultTitle) {
          this.metaService.setTitle(defaultTitle);
        }
        this.title = `SUBSCRIBE TO ${this.publication.title.toUpperCase()}`;
        this.setCheckBoxVisibility();
      }
    );
  }

  setCheckBoxVisibility() {
    if (this.publication.id === '1851') {
      return;
    }
    this.isCheckBoxVisible = false;
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
    this.isSubmitted = true;
    this.isSuccess = false;
    if (!contactForm.valid) {
      return;
    }
    const subscribe_form = {
      email: this.contactForm.controls['email'].value,
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
      signUpNewsletter: this.contactForm.controls['signUpNewsletter'].value
        ? 1
        : 0,
    };

    this.apiService
      .postAPI('1851/subscribe', subscribe_form)
      .subscribe((result) => {
        if (typeof result.data !== 'undefined') {
          this.isSubmitted = false;
          this.submitSuccessMsg = result.data.message;
          this.contactForm.reset();
          $('.current-details').slideUp();
          $('.prospective-details').slideUp();
          $('.executive-details').slideUp();
          $('.executive1-details').slideUp();

        } else {
          this.submitErrMsg = result.error.message;
        }
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
