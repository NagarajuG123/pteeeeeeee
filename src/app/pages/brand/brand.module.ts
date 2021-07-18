import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { InfoTopComponent } from './info-top/info-top.component';
import { SharedModule } from 'src/app/_shared/shared.module';
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
  ],
})
export class BrandModule {}
