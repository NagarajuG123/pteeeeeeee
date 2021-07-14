import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitemapComponent } from '../sitemap/sitemap.component';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: 'sitemap',
    component: SitemapComponent,
  },
  {
    path: '',
    component: BrandComponent,
  },
  {
    path: ':item',
    component: InfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
