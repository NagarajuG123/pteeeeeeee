import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerRankingRoutingModule } from './power-ranking-routing.module';
import { PowerRankingComponent } from './power-ranking.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    PowerRankingComponent
  ],
  imports: [
    CommonModule,
    PowerRankingRoutingModule,
    SharedModule
  ]
})
export class PowerRankingModule { }
