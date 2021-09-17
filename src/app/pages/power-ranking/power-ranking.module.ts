import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerRankingRoutingModule } from './power-ranking-routing.module';
import { PowerRankingComponent } from './power-ranking.component';

<<<<<<< HEAD

@NgModule({
  declarations: [
    PowerRankingComponent
  ],
  imports: [
    CommonModule,
    PowerRankingRoutingModule
  ]
})
export class PowerRankingModule { }
=======
@NgModule({
  declarations: [PowerRankingComponent],
  imports: [CommonModule, PowerRankingRoutingModule],
})
export class PowerRankingModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
