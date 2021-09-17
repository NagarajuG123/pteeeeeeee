import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { SitemapDetailsComponent } from '../sitemap-details/sitemap-details.component';
import { SitemapComponent } from '../sitemap/sitemap.component';
import { TermsComponent } from '../terms/terms.component';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
=======
import { SitemapComponent } from '../sitemap/sitemap.component';
import { SearchComponent } from '../search/search.component';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { TermsofuseComponent } from '../termsofuse/termsofuse.component';
import { SitemapDetailComponent } from '../sitemap/sitemap-detail/sitemap-detail.component';
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb

const routes: Routes = [
  {
    path: 'sitemap',
    component: SitemapComponent,
  },
  {
    path: 'sitemap/:year/:month',
<<<<<<< HEAD
    component: SitemapDetailsComponent,
  },
  {
    path: 'termsofuse',
    component: TermsComponent,
=======
    component: SitemapDetailComponent,
  },
  {
    path: 'searchpopup',
    component: SearchComponent,
  },
  {
    path: 'termsofuse',
    component: TermsofuseComponent,
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
  },
  {
    path: ':item',
    component: InfoComponent,
  },
  {
    path: '',
    component: BrandComponent,
  },
];
<<<<<<< HEAD
=======

>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
