import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [
    TermsComponent,
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    SharedModule,
    NgxPageScrollCoreModule.forRoot({ duration: 2500 }),
  ],
})
export class TermsModule { }
