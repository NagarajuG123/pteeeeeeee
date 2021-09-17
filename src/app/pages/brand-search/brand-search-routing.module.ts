import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandSearchComponent } from './brand-search.component';

const routes: Routes = [
  {
    path: '',
    component: BrandSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandSearchRoutingModule { }
