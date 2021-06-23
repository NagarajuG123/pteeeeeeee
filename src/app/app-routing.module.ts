import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SitemapComponent } from './pages/sitemap/sitemap.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { MonthlyCoversComponent } from './pages/monthly-covers/monthly-covers.component';
import { ErrorComponent } from './_shared/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    loadChildren:() => import ('./pages/sitemap/sitemap.module').then((m) => m.SitemapModule),
  },
  {
    path: 'termsofuse',
    component: TermsofuseComponent,
    loadChildren:() => import ('./pages/termsofuse/termsofuse.module').then((m) => m.TermsofuseModule),
  },
  {
    path: 'monthlycovers',
    component: MonthlyCoversComponent,
    loadChildren: () => import('./pages/monthly-covers/monthly-covers.module').then((m) => m.MonthlyCoversModule),
  },
  {
    path: 'about',
    component: LayoutComponent,
    loadChildren: () => import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'brand',
    component: LayoutComponent,
    loadChildren: () => import('./pages/brand/brand.module').then((m) => m.BrandModule),
  },
  {
    path: '**', // Navigate to Home Page if not found any page
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
