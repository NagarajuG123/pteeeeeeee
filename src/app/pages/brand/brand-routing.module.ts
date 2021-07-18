import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitemapComponent } from '../sitemap/sitemap.component';
import { SearchComponent } from '../search/search.component';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { TermsofuseComponent } from '../termsofuse/termsofuse.component';

const routes: Routes = [
  {
    path: 'sitemap',
    component: SitemapComponent,
  },
  {
    path: 'searchpopup',
    component: SearchComponent,
  },
  {
    path: 'termsofuse',
    component: TermsofuseComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
