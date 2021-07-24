import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { PartnerMainComponent } from './partner-main/partner-main.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AboutUsComponent, PartnerMainComponent],
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
