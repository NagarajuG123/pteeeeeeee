import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from 'src/app/pages/sitemap/sitemap.component';
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/_shared/shared.module';

const routes: Routes = [
  {
    path: ':year/:month',
    component: SitemapDetailComponent,
  },
  {
    path: '',
    component: SitemapComponent,
  }
];

@NgModule({
  declarations: [
    SitemapComponent,
    SitemapDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class SitemapModule { }
