import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetComponent } from './widget.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { HomeModule } from '../home/home.module';
import { LayoutOneComponent } from './layout-one/layout-one.component';
import { LayoutTwoComponent } from './layout-two/layout-two.component';
import { LayoutThreeComponent } from './layout-three/layout-three.component';


@NgModule({
  declarations: [
    WidgetComponent,
    LayoutOneComponent,
    LayoutTwoComponent,
    LayoutThreeComponent
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    SharedModule,
    HomeModule
  ]
})
export class WidgetModule { }
