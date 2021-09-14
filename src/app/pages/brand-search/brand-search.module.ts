import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandSearchRoutingModule } from './brand-search-routing.module';
import { BrandSearchComponent } from './brand-search.component';


@NgModule({
  declarations: [
    BrandSearchComponent
  ],
  imports: [
    CommonModule,
    BrandSearchRoutingModule
  ]
})
export class BrandSearchModule { }
