import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from 'src/app/pages/sitemap/sitemap.component';
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { SitemapRoutingModule } from './sitemap-routing.module';

@NgModule({
  declarations: [SitemapComponent, SitemapDetailComponent],
  imports: [CommonModule, SitemapRoutingModule, SharedModule],
})
export class SitemapModule {}
