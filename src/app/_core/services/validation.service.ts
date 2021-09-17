import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  static emailValidator(control) {
    if (control.value) {
      if (
        control.value.match(
          /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
        )
      ) {
        return null;
      } else {
        return { invalidEmailAddress: true };
      }
    }
  }
  static acceptValidator(control) {
    if (control.value) {
      return null;
    } else {
      return { invalidAccept: true };
    }
  }
  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      required: 'This field is required',
      invalidEmailAddress: 'Please check the email address',
      invalidPhoneNumber: 'Please check the phone number, (xxx) xxx-xxxx.',
      invalidAccept: 'Please check again.',
    };
    return config[validatorName];
  }
}
