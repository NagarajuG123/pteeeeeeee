import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: ':item',
    component: InfoComponent,
  },
  {
    path: '',
    component: BrandComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
