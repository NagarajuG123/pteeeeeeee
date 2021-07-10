import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandSearchRoutingModule } from './brand-search-routing.module';
import { BrandSearchComponent } from './brand-search.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { BrandSearchDataComponent } from './brand-search-data/brand-search-data.component';


@NgModule({
  declarations: [
    BrandSearchComponent,
    BrandSearchDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrandSearchRoutingModule
  ]
})
export class BrandSearchModule { }
