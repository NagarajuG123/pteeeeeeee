import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandSearchRoutingModule } from './brand-search-routing.module';
import { BrandSearchComponent } from './brand-search.component';

<<<<<<< HEAD

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
=======
@NgModule({
  declarations: [BrandSearchComponent],
  imports: [CommonModule, BrandSearchRoutingModule],
})
export class BrandSearchModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
