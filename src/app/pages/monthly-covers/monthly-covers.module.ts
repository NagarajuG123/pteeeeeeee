import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyCoversRoutingModule } from './monthly-covers-routing.module';
import { MonthlyCoversComponent } from './monthly-covers.component';


@NgModule({
  declarations: [
    MonthlyCoversComponent
  ],
  imports: [
    CommonModule,
    MonthlyCoversRoutingModule
  ]
})
export class MonthlyCoversModule { }
