import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitemapComponent } from './sitemap.component';
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';

const routes: Routes = [
  {
    path: 'sitemap',
    component: SitemapComponent,
  },
  {
    path: '',
    component: SitemapDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitemapRoutingModule { }
