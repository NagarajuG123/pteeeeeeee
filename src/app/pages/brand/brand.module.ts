import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ToastrModule } from 'ngx-toastr';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { InfoTopComponent } from './info-top/info-top.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { CategoryTrendingComponent } from './category-trending/category-trending.component';
import { CategoryComponent } from './category/category.component';
@NgModule({
  declarations: [
    BrandComponent,
    InfoComponent,
    InfoTopComponent,
    CategoryTrendingComponent,
    CategoryComponent
  ],
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
