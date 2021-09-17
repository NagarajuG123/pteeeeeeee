import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingbuzzComponent } from './trendingbuzz.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingbuzzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendingbuzzRoutingModule { }
