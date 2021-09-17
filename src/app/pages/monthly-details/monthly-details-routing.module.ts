import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyDetailsComponent } from './monthly-details.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyDetailsRoutingModule {}
