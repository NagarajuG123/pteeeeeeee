import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowerRankingComponent } from './power-ranking.component';

const routes: Routes = [
  {
    path: '',
    component: PowerRankingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
<<<<<<< HEAD
  exports: [RouterModule],
})
export class PowerRankingRoutingModule {}
=======
  exports: [RouterModule]
})
export class PowerRankingRoutingModule { }
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
