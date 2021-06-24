import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardsComponent } from './awards.component';
import { SharedModule } from 'src/app/_shared/shared.module';



@NgModule({
  declarations: [
    AwardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AwardsModule { }
