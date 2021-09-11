import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyCoversComponent } from './monthly-covers.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyCoversComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyCoversRoutingModule {}
