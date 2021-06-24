import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured.component';
import { SharedModule } from 'src/app/_shared/shared.module';



@NgModule({
  declarations: [
    FeaturedComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FeaturedModule { }
