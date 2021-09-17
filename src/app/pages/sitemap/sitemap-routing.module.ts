import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitemapComponent } from './sitemap.component';
<<<<<<< HEAD
import { SitemapDetailsComponent } from '../sitemap-details/sitemap-details.component';
=======
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb

const routes: Routes = [
  {
    path: ':year/:month',
<<<<<<< HEAD
    component: SitemapDetailsComponent,
=======
    component: SitemapDetailComponent,
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
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
