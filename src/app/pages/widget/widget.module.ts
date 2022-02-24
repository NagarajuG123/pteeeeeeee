import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetComponent } from './widget.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { HomeModule } from '../home/home.module';
import { Layout3Component } from './layout3/layout3.component';


@NgModule({
  declarations: [
    WidgetComponent,
    Layout3Component
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    SharedModule,
    HomeModule
  ]
})
export class WidgetModule { }
