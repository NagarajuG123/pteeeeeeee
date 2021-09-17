import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ToastrModule,
  ],
})
export class AboutUsModule {}
