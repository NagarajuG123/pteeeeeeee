import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutUsRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class AboutUsModule { }
