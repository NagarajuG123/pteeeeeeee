import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyCoversRoutingModule } from './monthly-covers-routing.module';
import { MonthlyCoversComponent } from './monthly-covers.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    MonthlyCoversComponent
  ],
  imports: [
    CommonModule,
    MonthlyCoversRoutingModule,
    SharedModule
  ]
})
export class MonthlyCoversModule { }
