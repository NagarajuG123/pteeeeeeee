import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyCoversRoutingModule } from './monthly-covers-routing.module';
import { MonthlyCoversComponent } from './monthly-covers.component';
<<<<<<< HEAD
=======
import { SharedModule } from 'src/app/_shared/shared.module';
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb


@NgModule({
  declarations: [
    MonthlyCoversComponent
  ],
  imports: [
    CommonModule,
<<<<<<< HEAD
    MonthlyCoversRoutingModule
=======
    MonthlyCoversRoutingModule,
    SharedModule
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
  ]
})
export class MonthlyCoversModule { }
