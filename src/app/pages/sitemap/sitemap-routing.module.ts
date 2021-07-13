import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitemapComponent } from './sitemap.component';
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';

const routes: Routes = [
  {
    path: ':year/:month',
    component: SitemapDetailComponent,
  },
  {
    path: '**',
    component: SitemapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitemapRoutingModule { }
