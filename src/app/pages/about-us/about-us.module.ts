import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { ToastrModule } from 'ngx-toastr';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    ToastrModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class AboutUsModule { }
