import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandSearchComponent } from './brand-search.component';

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: BrandSearchComponent,
  },
=======
    component: BrandSearchComponent
  }
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
<<<<<<< HEAD
  exports: [RouterModule],
})
export class BrandSearchRoutingModule {}
=======
  exports: [RouterModule]
})
export class BrandSearchRoutingModule { }
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
