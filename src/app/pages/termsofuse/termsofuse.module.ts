import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsofuseComponent } from './termsofuse.component';
import { SharedModule } from 'src/app/_shared/shared.module';



@NgModule({
  declarations: [
    TermsofuseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TermsofuseModule { }
