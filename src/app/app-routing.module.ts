import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { MonthlyCoversComponent } from './pages/monthly-covers/monthly-covers.component';
import { ErrorComponent } from './_shared/components/error/error.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { ContacteditorialComponent } from './pages/contacteditorial/contacteditorial.component';
import { SubscribepageComponent } from './pages/subscribepage/subscribepage.component';
import { PowerRankingComponent } from './pages/power-ranking/power-ranking.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'powerrankings',
    component: PowerRankingComponent,
    loadChildren: () => import('./pages/power-ranking/power-ranking.module').then((m) => m.PowerRankingModule),
  },
  {
    path: 'sitemap',
    loadChildren:() => import ('./pages/sitemap/sitemap.module').then((m) => m.SitemapModule),
  },
  {
    path: 'terms-of-use',
    component: TermsofuseComponent,
    loadChildren:() => import ('./pages/termsofuse/termsofuse.module').then((m) => m.TermsofuseModule),
  },
  {
    path: 'multiunitfranchisees',
    component: FeaturedComponent,
    loadChildren:() => import ('./pages/featured/featured.module').then((m) => m.FeaturedModule),
  },
  {
    path: 'contact-editorial',
    component: ContacteditorialComponent,
    loadChildren:() => import ('./pages/contacteditorial/contacteditorial.module').then((m) => m.ContacteditorialModule),
  },
  {
    path: 'subscribe',
    component: SubscribepageComponent,
    loadChildren: () => import('./pages/subscribepage/subscribepage.module').then((m) => m.SubscribepageModule),
  },
  {
    path: 'monthlycovers',
    component: MonthlyCoversComponent,
    loadChildren: () => import('./pages/monthly-covers/monthly-covers.module').then((m) => m.MonthlyCoversModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: '404',
    component: ErrorComponent,
  },
  {
    path: ':brand_slug',
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
