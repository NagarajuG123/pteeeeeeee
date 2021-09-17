import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { SharedModule } from '../../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BrandComponent,InfoComponent],
  imports: [CommonModule, BrandRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
=======
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ToastrModule } from 'ngx-toastr';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { InfoTopComponent } from './info-top/info-top.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { CategoryTrendingComponent } from './category-trending/category-trending.component';
@NgModule({
  declarations: [
    BrandComponent,
    InfoComponent,
    InfoTopComponent,
    CategoryTrendingComponent,
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
    NgxPageScrollCoreModule,
    ToastrModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
  ],
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
})
export class BrandModule {}
