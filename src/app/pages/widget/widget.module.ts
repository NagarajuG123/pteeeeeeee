import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetComponent } from './widget.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    SharedModule
  ]
})
export class WidgetModule { }
