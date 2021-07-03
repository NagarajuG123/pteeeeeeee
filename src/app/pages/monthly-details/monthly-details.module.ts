import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MonthlyDetailsComponent } from './monthly-details.component';


@NgModule({
  declarations: [
    MonthlyDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MonthlyDetailsModule { }
