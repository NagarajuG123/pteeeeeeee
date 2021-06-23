import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ErrorComponent } from './_shared/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'monthlycovers',
    component: LayoutComponent,
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
