import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from 'src/app/pages/sitemap/sitemap.component';
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';



@NgModule({
  declarations: [
    SitemapComponent,
    SitemapDetailComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SitemapModule { }
