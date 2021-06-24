import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { InfoTopComponent } from './info-top/info-top.component';
import { InfoBottomComponent } from './info-bottom/info-bottom.component';


@NgModule({
  declarations: [
    BrandComponent,
    InfoComponent,
    InfoTopComponent,
    InfoBottomComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
