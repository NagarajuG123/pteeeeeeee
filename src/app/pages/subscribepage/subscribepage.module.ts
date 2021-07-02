import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribepageComponent } from './subscribepage.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    SubscribepageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SubscribepageModule { }
