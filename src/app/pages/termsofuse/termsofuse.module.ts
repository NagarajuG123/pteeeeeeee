import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsofuseComponent } from './termsofuse.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { TermsofuseRoutingModule } from './termsofuse-routing.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [TermsofuseComponent],
  imports: [
    CommonModule,
    SharedModule,
    TermsofuseRoutingModule,
    NgxPageScrollCoreModule.forRoot({ duration: 2500 }),
  ],
})
export class TermsofuseModule {}
