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
   
  });}

  ngOnInit(): void {
    this.isSubmitted = false;
    this.isSuccess = false;
    this.contactForm.reset({
      signUpNewsletter: true
    });
  }

  
  onContactSubmit(contactForm: FormGroup) {
    this.isSubmitted = true;
    this.isSuccess = false;
    if (!contactForm.valid) {
      return;
    }
    const subscribe_form = {

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


