import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { InfoTopComponent } from './info-top/info-top.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    BrandComponent,
    InfoComponent,
    InfoTopComponent,
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
  ]
})
export class BrandModule { }
