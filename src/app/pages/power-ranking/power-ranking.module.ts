import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerRankingRoutingModule } from './power-ranking-routing.module';
import { PowerRankingComponent } from './power-ranking.component';

@NgModule({
  declarations: [PowerRankingComponent],
  imports: [CommonModule, PowerRankingRoutingModule],
})
export class PowerRankingModule {}
