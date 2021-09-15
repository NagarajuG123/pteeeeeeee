import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';
import { ErrorMessageComponent } from 'src/app/_shared/components/error-message/error-message.component';

@NgModule({
  declarations: [AboutUsComponent, ErrorMessageComponent],
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
