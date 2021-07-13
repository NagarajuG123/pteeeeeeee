import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'searchpopup',
    component: SearchComponent,
  },
  {
    path: '',
    component: BrandComponent,
  },
  {
    path: ':item',
    component: InfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
