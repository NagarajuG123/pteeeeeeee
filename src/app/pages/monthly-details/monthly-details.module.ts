import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

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
=======
import { SharedModule } from 'src/app/_shared/shared.module';
import { MonthlyDetailsComponent } from './monthly-details.component';
import { MonthlyDetailsRoutingModule } from './monthly-details-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [MonthlyDetailsComponent],
  imports: [MonthlyDetailsRoutingModule, CommonModule, SharedModule],
  providers: [DatePipe],
})
export class MonthlyDetailsModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
