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
<<<<<<< HEAD
  exports: [RouterModule],
})
export class MonthlyDetailsRoutingModule {}
=======
  exports: [RouterModule]
})
export class MonthlyDetailsRoutingModule { }
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
