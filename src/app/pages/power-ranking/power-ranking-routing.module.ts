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
  exports: [RouterModule],
})
export class PowerRankingRoutingModule {}
