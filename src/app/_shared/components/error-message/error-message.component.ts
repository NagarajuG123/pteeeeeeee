import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/_core/services/validation.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: FormControl;
  constructor() {}

  ngOnInit(): void {}
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
}
