import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitemapComponent } from './sitemap.component';
import { SitemapDetailsComponent } from '../sitemap-details/sitemap-details.component';

const routes: Routes = [
  {
    path: ':year/:month',
    component: SitemapDetailsComponent,
  },
  {
    path: '**',
    component: SitemapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitemapRoutingModule {}
