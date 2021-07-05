import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsofuseComponent } from './termsofuse.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { TermsofuseRoutingModule } from './termsofuse-routing.module';



@NgModule({
  declarations: [
    TermsofuseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TermsofuseRoutingModule
  ]
})
export class TermsofuseModule { }
