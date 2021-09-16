import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AboutModule {}
