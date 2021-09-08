import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { DefaultImagePipe } from 'src/app/_core/pipes/default-image.pipe';


@NgModule({
  declarations: [
    TermsComponent,
    DefaultImagePipe
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    // NgxPageScrollCoreModule.forRoot({ duration: 2500 }),
  ],
  exports:[
    DefaultImagePipe
  ]
})
export class TermsModule { }
