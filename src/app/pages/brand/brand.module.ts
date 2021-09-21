import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ToastrModule } from 'ngx-toastr';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { CategoryComponent } from './category/category.component';
@NgModule({
  declarations: [BrandComponent, InfoComponent, CategoryComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
    NgxPageScrollCoreModule,
    ToastrModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
  ],
})
export class BrandModule {}
