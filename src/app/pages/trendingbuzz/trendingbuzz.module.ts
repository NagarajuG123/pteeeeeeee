import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingbuzzRoutingModule } from './trendingbuzz-routing.module';
import { TrendingbuzzComponent } from './trendingbuzz.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    TrendingbuzzComponent
  ],
  imports: [
    CommonModule,
    TrendingbuzzRoutingModule,
    SharedModule
  ]
})
export class TrendingbuzzModule { }
