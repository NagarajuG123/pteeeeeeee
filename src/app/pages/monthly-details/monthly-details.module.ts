import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyDetailsRoutingModule } from './monthly-details-routing.module';
import { MonthlyDetailsComponent } from './monthly-details.component';


@NgModule({
  declarations: [
    MonthlyDetailsComponent
  ],
  imports: [
    CommonModule,
    MonthlyDetailsRoutingModule
  ]
})
export class MonthlyDetailsModule { }
