import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
