import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      'required': 'This field is required',
      'invalidEmailAddress': 'Please check the email address',
      'invalidPhoneNumber': 'Please check the phone number, (xxx) xxx-xxxx.',
      'invalidAccept': 'Please check again.',
    };
  }

  static acceptValidator(control: { value: any; }) {
    if (control.value) {
      return null;
    } else {
      return {'invalidAccept': true};
    }
  }
}